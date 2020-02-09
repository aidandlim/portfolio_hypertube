import React from 'react';

import { useSelector } from 'react-redux';

import { signup } from '../../data';

import '../Auth/index.css';

const Component = ({ history }) => {
    const ui = useSelector(state => state.ui);

    const _handleBack = () => {
        history.goBack();
    };

    const _handleForm = e => {
        e.preventDefault();
        const form = document.signin;
        signup(
            form.userName,
            form.password,
            form.email,
            form.firstName,
            form.lastName,
            res => {
                if (res === 1) {
                    alert('complete');
                    history.goBack();
                } else if (res === 2) {
                    alert('password error');
                } else if (res === 3) {
                    alert('username error');
                }
            }
        );
    };

    return (
        <div className='auth'>
            <div className='auth-container'>
                <div className='auth-title'>
                    {ui.lang === 'en_US' ? 'Sign Up' : '회원가입'}
                </div>
                <div className='auth-description'>
                    {ui.lang === 'en_US'
                        ? 'Sometimes, all you need to do is completely make an ass of yourself and laugh it off to realise that life isn’t so bad after all. The green tea and avocado smoothie turned out exactly as would be expected.'
                        : '모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다. 이 헌법은 1988년 2월 25일부터 시행한다. 다만, 이 헌법을 시행하기 위하여 필요한 법률의 제정·개정과 이 헌법에 의한 대통령 및 국회의원의 선거 기타 이 헌법시행에 관한 준비는 이 헌법시행 전에 할 수 있다.'}
                </div>
                <form name='signup' autoComplete='off' onSubmit={_handleForm}>
                    <div className='auth-placeholder'>
                        {ui.lang === 'en_US' ? 'USER NAME' : '아이디'}
                    </div>
                    <input
                        className='auth-input'
                        type='text'
                        name='userName'
                        autoFocus
                    />
                    <div className='auth-placeholder'>
                        {ui.lang === 'en_US' ? 'PASSWORD' : '비밀번호'}
                    </div>
                    <input
                        className='auth-input'
                        type='password'
                        name='password'
                    />
                    <div className='auth-placeholder'>
                        {ui.lang === 'en_US'
                            ? 'CONFIRM PASSWORD'
                            : '비밀번호 확인'}
                    </div>
                    <input
                        className='auth-input'
                        type='password'
                        name='confirm'
                    />
                    <div className='auth-placeholder'>
                        {ui.lang === 'en_US' ? 'EMAIL' : '이메일'}
                    </div>
                    <input
                        className='auth-input'
                        type='email'
                        name='email'
                        autoComplete='password'
                    />
                    <div className='auth-placeholder'>
                        {ui.lang === 'en_US' ? 'FIRST NAME' : '이름'}
                    </div>
                    <input
                        className='auth-input'
                        type='text'
                        name='firstName'
                        autoComplete='password'
                    />
                    <div className='auth-placeholder'>
                        {ui.lang === 'en_US' ? 'LAST NAME' : '성'}
                    </div>
                    <input
                        className='auth-input'
                        type='text'
                        name='lastName'
                        autoComplete='password'
                    />
                    <div className='auth-nav' onClick={_handleBack}>
                        {ui.lang === 'en_US'
                            ? 'Do you have an account already?'
                            : '이미 계정을 갖고 계신가요?'}
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
