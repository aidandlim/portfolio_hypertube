import React from 'react';

import { Link } from 'react-router-dom';

import '../index.css';

const Component = ({ history }) => {
    const _handleBack = () => {
        history.goBack();
    };

    return (
        <div className="auth">
            <div className="auth-container">
                <div className="auth-title">Sign Up</div>
                <div className="auth-description">
                    Sometimes, all you need to do is completely make an ass of
                    yourself and laugh it off to realise that life isn’t so bad
                    after all.
                </div>
                <form autoComplete="off">
                    <div className="auth-placeholder">USER NAME</div>
                    <input
                        className="auth-input"
                        type="text"
                        name="userName"
                        autoFocus
                    />
                    <div className="auth-placeholder">PASSWORD</div>
                    <input
                        className="auth-input"
                        type="password"
                        name="password"
                    />
                    <div className="auth-placeholder">CONFIRM PASSWORD</div>
                    <input
                        className="auth-input"
                        type="password"
                        name="confirm"
                    />
                    <div className="auth-placeholder">EMAIL</div>
                    <input
                        className="auth-input"
                        type="email"
                        name="email"
                        autoComplete="password"
                    />
                    <div className="auth-placeholder">FIRST NAME</div>
                    <input
                        className="auth-input"
                        type="text"
                        name="firstName"
                        autoComplete="password"
                    />
                    <div className="auth-placeholder">LAST NAME</div>
                    <input
                        className="auth-input"
                        type="text"
                        name="lastName"
                        autoComplete="password"
                    />
                    <Link to="/auth/signin">
                        <div className="auth-nav">
                            Do you have an account already?
                        </div>
                    </Link>
                    <input
                        className="auth-button auth-submit"
                        type="submit"
                        value="SIGN UP"
                    />
                    <input
                        className="auth-button"
                        type="button"
                        value="BACK"
                        onClick={_handleBack}
                    />
                </form>
            </div>
        </div>
    );
};

export default Component;
