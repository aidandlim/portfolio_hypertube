package com.hypertube.service;

import com.hypertube.model.Response;
import com.hypertube.model.User;
import com.hypertube.model.Verify;
import com.hypertube.repository.UserRepository;
import com.hypertube.repository.VerifyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    VerifyRepository verifyRepository;

    @Autowired
    TokenService tokenService;

    @Autowired
    JavaMailSender emailSender;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    public Response signUp(User user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return new Response(200);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(400);
        }
    }

    public Response signIn(User user) {
        try {
            User valid = userRepository.findByUserName(user.getUserName());
            if (valid == null) return new Response(411);
            else
                return passwordEncoder.matches(user.getPassword(), valid.getPassword()) ?
                        new Response(200, tokenService.createToken(valid)) : new Response(412);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(400);
        }
    }

    public Response oAuth(User user) {
        try {
            User valid = userRepository.findByEmail(user.getEmail());
            if (valid == null) userRepository.save(user);
            else if (!valid.getSocialType().equals(user.getSocialType())) return new Response(411);
            return new Response(200, tokenService.createToken(userRepository.findByEmail(user.getEmail())));
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(400);
        }
    }

    public Response getUserName(String userName) {
        try {
            User valid = userRepository.findByUserName(userName);
            return valid == null ? new Response(200) : new Response(400);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(400);
        }
    }

    public Response getEmail(String email) {
        try {
            User valid = userRepository.findByEmail(email);
            return valid == null ? new Response(200) : new Response(400);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(400);
        }
    }

    public Response recovery(String email) {
        try {
            if (userRepository.findByEmail(email) == null) return new Response(400);
            Verify verify = new Verify();
            UUID uuid = UUID.randomUUID();
            verify.setUser(userRepository.findByEmail(email));
            verify.setUuid(uuid.toString());
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
            helper.setSubject("HyperTube Recovery Service");
            helper.setText( "<body>" +
                    "<a classname=\"hover\" href=\"https://localhost:3000/auth/recovery/" +
                    uuid +
                    "\" style=\"text-decoration: none; color: #d3d3d3;\">" +
                    "<h2>Change Your Password Now !</h2>" +
                    "</a>" +
                    "</body>", true);
            emailSender.send(message);
            verifyRepository.save(verify);
            return new Response(200, uuid);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(400);
        }
    }

    public Response recoveryPassword(String password, String uuid) {
        try {
            Verify verify = verifyRepository.findByUuid(uuid);
            if (verify == null) return new Response(400);
            verifyRepository.delete(verify);
            User user = userRepository.findById(verify.getUser().getId()).orElse(null);
            if (user == null) return new Response(400);
            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);
            return new Response(200);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(400);
        }
    }

}