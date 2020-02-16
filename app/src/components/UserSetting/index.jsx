import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { getUserName, getEmail, putUser } from '../../data';
import { session } from '../../util';

import FeatherIcon from 'feather-icons-react';
import './index.css';
import '../Auth/index.css';

const Component = ({ user, setUser }) => {
    const auth = useSelector(state => state.auth);
    const ui = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const _handleForm = e => {
        e.preventDefault();
        if (_handleCheckUserName && _handleCheckPassword && _handleCheckConfrim && _handleCheckEmail) {
            const form = document.setting;
            putUser(auth.token, form.userName.value, form.password.value, form.email.value, form.firstName.value, form.lastName.value, res => {
                if (session(dispatch, res)) {
                    setUser({
                        id: user.id,
                        userName: form.userName.value,
                        email: form.email.value,
                        firstName: form.firstName.value,
                        lastName: form.lastName.value,
                        socialType: user.socialType
                    });
                } else {
                    alert('message', ui.lang === 'en_US' ? 'Something went wrong :(' : '알 수 없는 오류가 발생했습니다 :(', null, null);
                }
            });
        } else {
            alert('messeage', 'Input data is invalid! Please check your information again.', null, null);
        }
    };

    const _handleReset = () => {
        const form = document.setting;

        form.userName.value = user.userName;
        form.password.value = '';
        form.confirm.value = '';
        form.email.value = user.email;
        form.firstName.value = user.firstName;
        form.lastName.value = user.lastName;
    };

    const normalColor = '#505050';
    const confirmedColor = '#64FFDA';

    const _handleCheckUserName = () => {
        const value = document.setting.userName.value;
        const target = 'setting-userName';

        if (value.length < 5) {
            document.getElementById(target).style.color = normalColor;
            return false;
        }

        getUserName(value, res => {
            if (res.status === 200) {
                document.getElementById(target).style.color = confirmedColor;
                return true;
            } else {
                document.getElementById(target).style.color = normalColor;
                return false;
            }
        });
    };

    const _handleCheckPassword = () => {
        const password = document.setting.password.value;
        const target = 'setting-password';

        const pattern1 = /[0-9]/;
        const pattern2 = /[a-zA-Z]/;
        const pattern3 = /[~!@#$%<>^&*]/;

        document.getElementById(target).style.color = normalColor;

        let error = 0;

        if (!(8 <= password.length && password.length <= 20)) {
            error++;
        }

        if (!pattern1.test(password) || !pattern2.test(password) || !pattern3.test(password)) {
            error++;
        }

        if (error > 0) {
            return false;
        } else {
            document.getElementById(target).style.color = confirmedColor;
            return true;
        }
    };

    const _handleCheckConfrim = () => {
        const password = document.setting.password.value;
        const confirm = document.setting.confirm.value;
        const target = 'setting-confirm';

        document.getElementById(target).style.color = normalColor;

        let error = 0;

        if (password === '' || password !== confirm) {
            error++;
        }

        if (error > 0) {
            return false;
        } else {
            document.getElementById(target).style.color = confirmedColor;
            return true;
        }
    };

    const _handleCheckEmail = () => {
        const value = document.setting.email.value;
        const target = 'setting-email';

        if (value.length < 5) {
            document.getElementById(target).style.color = normalColor;
            return false;
        }

        getEmail(value, res => {
            if (res.status === 200) {
                document.getElementById(target).style.color = confirmedColor;
                return true;
            } else {
                document.getElementById(target).style.color = normalColor;
                return false;
            }
        });
    };

    return (
        <div className='userSetting'>
            <form name='setting' autoComplete='off' onSubmit={_handleForm}>
                <div className='auth-placeholder-disabled'>
                    {ui.lang === 'en_US' ? 'USER NAME' : '아이디'}
                    <div className='auth-input-check'>
                        <FeatherIcon id='setting-userName' className='auth-input-check-icon' icon='check' />
                    </div>
                </div>
                <input className='auth-input-disabled' type='text' name='userName' defaultValue={user.userName} onChange={_handleCheckUserName} />
                <div className='auth-placeholder'>
                    {ui.lang === 'en_US' ? 'PASSWORD' : '비밀번호 변경'}
                    <div className='auth-input-check'>
                        <FeatherIcon id='setting-password' className='auth-input-check-icon' icon='check' />
                    </div>
                </div>
                <input className='auth-input' type='password' name='password' onChange={_handleCheckPassword} />
                <div className='auth-placeholder'>
                    {ui.lang === 'en_US' ? 'CONFIRM PASSWORD' : '비밀번호 확인'}
                    <div className='auth-input-check'>
                        <FeatherIcon id='setting-confirm' className='auth-input-check-icon' icon='check' />
                    </div>
                </div>
                <input className='auth-input' type='password' name='confirm' onChange={_handleCheckConfrim} />
                <div className='auth-placeholder'>
                    {ui.lang === 'en_US' ? 'EMAIL' : '이메일'}
                    <div className='auth-input-check'>
                        <FeatherIcon id='setting-email' className='auth-input-check-icon' icon='check' />
                    </div>
                </div>
                <input className='auth-input' type='email' name='email' defaultValue={user.email} autoComplete='password' autoFocus onChange={_handleCheckEmail} />
                <div className='auth-placeholder'>{ui.lang === 'en_US' ? 'FIRST NAME' : '이름'}</div>
                <input className='auth-input' type='text' name='firstName' defaultValue={user.firstName} autoComplete='password' />
                <div className='auth-placeholder'>{ui.lang === 'en_US' ? 'LAST NAME' : '성'}</div>
                <input className='auth-input' type='text' name='lastName' defaultValue={user.lastName} autoComplete='password' />
                <input className='auth-button auth-submit' type='submit' value={ui.lang === 'en_US' ? 'SAVE' : '저장'} />
                <input className='auth-button' type='button' value={ui.lang === 'en_US' ? 'RESET' : '취소'} onClick={_handleReset} />
            </form>
        </div>
    );
};

export default Component;
