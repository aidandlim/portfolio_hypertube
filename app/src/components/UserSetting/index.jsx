import React from 'react';

import { useSelector } from 'react-redux';

import './index.css';
import '../Auth/index.css';

const Component = ({ user, setUser }) => {
    const ui = useSelector(state => state.ui);

    const _handleForm = e => {
        e.preventDefault();
    };

    const _handleReset = () => {
        const form = document.setting;

        form.userName.value = user.userName;
        form.password.value = '';
        form.confirm.value = '';
        form.email.value = user.email;
        form.firstName.value = user.firstName;
        form.lastName.value = user.lastName;
    }

    return (
        <div className="userSetting">
            <form name="setting" autoComplete="off" onSubmit={_handleForm}>
                <div className="auth-placeholder-disabled">
                    {ui.lang === 'en_US' ? 'USER NAME' : '아이디'}
                </div>
                <input
                    className="auth-input-disabled"
                    type="text"
                    name="userName"
                    disabled
                />
                <div className="auth-placeholder">
                    {ui.lang === 'en_US' ? 'PASSWORD' : '비밀번호 변경'}
                </div>
                <input className="auth-input" type="password" name="password" />
                <div className="auth-placeholder">
                    {ui.lang === 'en_US' ? 'CONFIRM PASSWORD' : '비밀번호 확인'}
                </div>
                <input className="auth-input" type="password" name="confirm" />
                <div className="auth-placeholder">
                    {ui.lang === 'en_US' ? 'EMAIL' : '이메일'}
                </div>
                <input
                    className="auth-input"
                    type="email"
                    name="email"
                    autoComplete="password"
                    autoFocus
                />
                <div className="auth-placeholder">
                    {ui.lang === 'en_US' ? 'FIRST NAME' : '이름'}
                </div>
                <input
                    className="auth-input"
                    type="text"
                    name="firstName"
                    autoComplete="password"
                />
                <div className="auth-placeholder">
                    {ui.lang === 'en_US' ? 'LAST NAME' : '성'}
                </div>
                <input
                    className="auth-input"
                    type="text"
                    name="lastName"
                    autoComplete="password"
                />
                <input
                    className="auth-button auth-submit"
                    type="submit"
                    value={ui.lang === 'en_US' ? 'SAVE' : '저장'}
                />
                <input
                    className="auth-button"
                    type="button"
                    value={ui.lang === 'en_US' ? 'RESET' : '취소'}
                    onClick={_handleReset}
                />
            </form>
        </div>
    );
};

export default Component;
