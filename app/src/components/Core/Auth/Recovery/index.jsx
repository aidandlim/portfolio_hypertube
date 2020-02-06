import React from 'react';

const Component = ({ history }) => {
    const _handleBack = () => {
        history.goBack();
    };

    return (
        <div className="auth">
            <div className="auth-container">
                <div className="auth-title">Password Recovery</div>
                <div className="auth-description">
                    Sometimes, all you need to do is completely make an ass of
                    yourself and laugh it off to realise that life isn’t so bad
                    after all. The green tea and avocado smoothie turned out
                    exactly as would be expected.
                </div>
                <form autoComplete="off">
                    <div className="auth-placeholder">EMAIL</div>
                    <input
                        className="auth-input"
                        type="email"
                        name="email"
                        autoComplete="password"
                        autoFocus
                    />
                    <input
                        className="auth-button auth-submit"
                        type="submit"
                        value="SUBMIT"
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
