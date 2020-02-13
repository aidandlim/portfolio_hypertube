import React, { useEffect } from 'react';

import queryString from 'query-string';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import { request42Token } from '../../data';

import { GOOGLE_ID, FACEBOOK_ID, SV_ID } from '../../constants/api';

import './index.css';

const Component = ({ match }) => {
    // useEffect(() => {
    //     console.log(location);
    //     if (location !== undefined) {
    //         const { code } = queryString.parse(location.search);

    //         console.log(code);

    //         if (code !== undefined) {
    //             request42Token(code, res => {
    //                 console.log(res);
    //             });
    //         }
    //     }
    // }, [location]);

    const _handleInitGoogleSignin = () => {
        document.querySelector('.google-signin').click();
    };

    const _handleGoogleSignin = res => {
        console.log(res.profileObj);
    };

    const _handleInitFacebookSignin = () => {
        document.querySelector('.facebook-signin').click();
    };

    const _handleFacebookSignin = res => {
        console.log(res);
    };

    const _handleInit42Signin = () => {
        window.open(
            `https://api.intra.42.fr/oauth/authorize?client_id=${SV_ID}&scope=public&redirect_uri=http://localhost:3000/auth/signin&response_type=code`,
            '_self'
        );
    };

    return (
        <div className="socialSignIn">
            <div
                className="socialSignIn-button google"
                onClick={_handleInitGoogleSignin}
            >
                Google
            </div>
            <div
                className="socialSignIn-button facebook"
                onClick={_handleInitFacebookSignin}
            >
                Facebook
            </div>
            <div
                className="socialSignIn-button siliconvalley"
                onClick={_handleInit42Signin}
            >
                42SV
            </div>
            <div className="hidden">
                <GoogleLogin
                    className="google-signin"
                    clientId={GOOGLE_ID}
                    onSuccess={_handleGoogleSignin}
                    onFailure={_handleGoogleSignin}
                    cookiePolicy={'single_host_origin'}
                />
                <FacebookLogin
                    cssClass="facebook-signin"
                    autoLoad={false}
                    appId={FACEBOOK_ID}
                    fields="email,first_name,last_name,picture"
                    callback={_handleFacebookSignin}
                />
            </div>
        </div>
    );
};

export default Component;
