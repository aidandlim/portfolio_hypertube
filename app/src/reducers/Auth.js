const data = {
    token: ''
};

const reducer = (state = data, action) => {
    switch (action.type) {
        case 'AUTH_TOKEN':
            return Object.assign({}, state, {
                token: action.payload.token
            });
        default:
            return state;
    }
};

export default reducer;
