export const auth_token = (value) => {
    return {
        type: 'AUTH_TOKEN',
        payload: {
            token: value
        }
    };
};
