const data = {
    isLogin: false,
};

const reducer = (state = data, action: {
    type: string;
    payload: {
        isLogin: boolean;
    }
}) => {
    switch (action.type) {
        case 'AUTH_ISLOGIN':
            return Object.assign({}, state, {
                isLogin: action.payload.isLogin
            });
        default:
            return state;
    }
};

export default reducer;

// import User from '../models/User';

// const data = new User(-1, '', '', '', '', '', '');

// const reducer = (state = data, action: {
//     type: string;
//     payload: {
//         id: number,
//         userName: string,
//         password: string,
//         email: string,
//         firstName: string,
//         lastName: string,
//         picture: string,
//     }
// }) => {
//     switch (action.type) {
//         case 'USER':
//             return Object.assign({}, state, {
//                 id: action.payload.id,
//                 userName: action.payload.userName,
//                 password: action.payload.password,
//                 email: action.payload.email,
//                 firstName: action.payload.firstName,
//                 lastName: action.payload.lastName,
//                 picture: action.payload.picture
//             });
//         default:
//             return state;
//     }
// };

// export default reducer;
