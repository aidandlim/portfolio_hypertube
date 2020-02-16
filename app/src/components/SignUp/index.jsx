import React from 'react';

import { useSelector } from 'react-redux';

import { getUserName, getEmail, signup } from '../../data';

import FeatherIcon from 'feather-icons-react';
import '../Auth/index.css';

const Component = ({ history }) => {
    const ui = useSelector(state => state.ui);

    const _handleBack = () => {
        history.goBack();
    };

    const _handleForm = e => {
        e.preventDefault();
        if (_handleCheckUserName && _handleCheckPassword && _handleCheckConfrim && _handleCheckEmail) {
            const form = document.signup;
            signup(
                form.userName.value,
                form.password.value,
                form.email.value,
                form.firstName.value,
                form.lastName.value,
                res => {
                    if (res.status === 200) {
                        history.goBack();
                    }
                }
            );
        } else {
        }
    };

    const normalColor = '#505050';
    const confirmedColor = '#64FFDA';

    const _handleCheckUserName = () => {
        const value = document.signup.userName.value;
        const target = 'signup-userName';

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
        const password = document.signup.password.value;
        const target = 'signup-password';

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
        const password = document.signup.password.value;
        const confirm = document.signup.confirm.value;
        const target = 'signup-confirm';

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
        const value = document.signup.email.value;
        const target = 'signup-email';

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
        <div className='auth'>
            <div className='auth-container'>
                <div className='auth-title'>{ui.lang === 'en_US' ? 'Sign Up' : '회원가입'}</div>
                <div className='auth-description'>
                    {ui.lang === 'en_US'
                        ? 'Sometimes, all you need to do is completely make an ass of yourself and laugh it off to realise that life isn’t so bad after all. The green tea and avocado smoothie turned out exactly as would be expected.'
                        : '모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다. 이 헌법은 1988년 2월 25일부터 시행한다. 다만, 이 헌법을 시행하기 위하여 필요한 법률의 제정·개정과 이 헌법에 의한 대통령 및 국회의원의 선거 기타 이 헌법시행에 관한 준비는 이 헌법시행 전에 할 수 있다.'}
                </div>
                <form name='signup' autoComplete='off' onSubmit={_handleForm}>
                    <div className='auth-placeholder'>
                        {ui.lang === 'en_US' ? 'USER NAME' : '아이디'}
                        <div className='auth-input-check'>
                            <FeatherIcon id='signup-userName' className='auth-input-check-icon' icon='check' />
                        </div>
                    </div>
                    <input
                        className='auth-input'
                        type='text'
                        name='userName'
                        autoFocus
                        onChange={_handleCheckUserName}
                    />
                    <div className='auth-placeholder'>
                        {ui.lang === 'en_US' ? 'PASSWORD' : '비밀번호'}
                        <div className='auth-input-check'>
                            <FeatherIcon id='signup-password' className='auth-input-check-icon' icon='check' />
                        </div>
                    </div>
                    <input className='auth-input' type='password' name='password' onChange={_handleCheckPassword} />
                    <div className='auth-placeholder'>
                        {ui.lang === 'en_US' ? 'CONFIRM PASSWORD' : '비밀번호 확인'}
                        <div className='auth-input-check'>
                            <FeatherIcon id='signup-confirm' className='auth-input-check-icon' icon='check' />
                        </div>
                    </div>
                    <input className='auth-input' type='password' name='confirm' onChange={_handleCheckConfrim} />
                    <div className='auth-placeholder'>
                        {ui.lang === 'en_US' ? 'EMAIL' : '이메일'}
                        <div className='auth-input-check'>
                            <FeatherIcon id='signup-email' className='auth-input-check-icon' icon='check' />
                        </div>
                    </div>
                    <input
                        className='auth-input'
                        type='email'
                        name='email'
                        autoComplete='password'
                        onChange={_handleCheckEmail}
                    />
                    <div className='auth-placeholder'>{ui.lang === 'en_US' ? 'FIRST NAME' : '이름'}</div>
                    <input className='auth-input' type='text' name='firstName' autoComplete='password' />
                    <div className='auth-placeholder'>{ui.lang === 'en_US' ? 'LAST NAME' : '성'}</div>
                    <input className='auth-input' type='text' name='lastName' autoComplete='password' />
                    <div className='auth-nav' onClick={_handleBack}>
                        {ui.lang === 'en_US' ? 'Do you have an account already?' : '이미 계정을 갖고 계신가요?'}
                    </div>
                    <input
                        className='auth-button auth-submit'
                        type='submit'
                        value={ui.lang === 'en_US' ? 'SIGN UP' : '회원가입'}
                    />
                    <input
                        className='auth-button'
                        type='button'
                        value={ui.lang === 'en_US' ? 'BACK' : '돌아가기'}
                        onClick={_handleBack}
                    />
                </form>
            </div>
        </div>
    );
};

export default Component;
