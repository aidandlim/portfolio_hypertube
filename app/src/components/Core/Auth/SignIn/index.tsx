import React from 'react';

import { Link } from 'react-router-dom';

export interface Props {
    history: any;
}

const Component: React.FC<Props> = ({ history }) => {
    const _handleBack = () => {
        history.goBack();
    };

    return (
        <div className="auth">
            <div className="auth-container">
                <div className="auth-title">Sign In</div>
                <div className="auth-description">
                    Sometimes, all you need to do is completely make an ass of
                    yourself and laugh it off to realise that life isn’t so bad
                    after all. The green tea and avocado smoothie turned out
                    exactly as would be expected.
                </div>
                <form autoComplete="off">
                    <div className="auth-placeholder">USER NAME</div>
                    <input className="auth-input" type="text" name="userName" autoFocus />
                    <div className="auth-placeholder">PASSWORD</div>
                    <input
                        className="auth-input"
                        type="password"
                        name="password"
                    />
                    <Link to="/auth/signup">
                        <div className="auth-nav">
                            Don't you have an account yet? Just Sign Up for free!
                        </div>
                    </Link>
                    <Link to="/auth/recovery">
                        <div className="auth-nav">Do you Forgot Password?</div>
                    </Link>
                    <input
                        className="auth-button auth-submit"
                        type="submit"
                        value="SIGN IN"
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
