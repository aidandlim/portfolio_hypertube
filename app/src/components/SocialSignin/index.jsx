import React from 'react';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import { GOOGLE_ID, FACEBOOK_ID } from '../../constants/api';

import './index.css';

const Component = () => {
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

    return (
        <div className="socialSignin">
            <div
                className="socialSignin-button google"
                onClick={_handleInitGoogleSignin}
            >
                Google
            </div>
            <div
                className="socialSignin-button facebook"
                onClick={_handleInitFacebookSignin}
            >
                Facebook
            </div>
            <div className="socialSignin-button siliconvalley">
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
                    appId={FACEBOOK_ID}
                    fields="email,first_name,last_name,picture"
                    callback={_handleFacebookSignin}
                />
            </div>
        </div>
    );
};

export default Component;
