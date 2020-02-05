import React, { useState, FormEvent } from 'react';

import { useDispatch } from 'react-redux';
import { auth_isLogin } from '../../../../actions';

import { signin } from '../../../../data';

import { Link } from 'react-router-dom';

export interface Props {
    history: any;
}

const Component: React.FC<Props> = ({ history }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const _handleBack = () => {
        history.goBack();
    };

    const _handleForm = (e: FormEvent) => {
        e.preventDefault();
        signin(userName, password, (result: number) => {
            if (result === 1) {
                dispatch(auth_isLogin());
                history.goBack();
            } else if (result === 2) {
                alert('password error');
            } else if (result === 3) {
                alert('username error');
            }
        });
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
                <form autoComplete="off" onSubmit={_handleForm}>
                    <div className="auth-placeholder">USER NAME</div>
                    <input
                        className="auth-input"
                        type="text"
                        name="userName"
                        onChange={e => setUserName(e.target.value)}
                        autoFocus
                    />
                    <div className="auth-placeholder">PASSWORD</div>
                    <input
                        className="auth-input"
                        type="password"
                        name="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Link to="/auth/signup">
                        <div className="auth-nav">
                            Don't you have an account yet? Just Sign Up for
                            free!
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
