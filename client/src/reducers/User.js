const data = {
    id: -1,
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    picture: '',
    socialType: ''
};

const reducer = (state = data, action) => {
    switch (action.type) {
        case 'USER_DATA':
            return Object.assign({}, state, {
                id: action.payload.id,
                userName: action.payload.userName,
                email: action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                picture: action.payload.picture,
                socialType: action.payload.socialType
            });
        default:
            return state;
    }
};

export default reducer;
