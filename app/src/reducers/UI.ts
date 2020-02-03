const data = {
    darkMode: false,
    lang: 'en'
};

const reducer = (state = data, action: {
    type: string;
    payload: {
        darkMode?: boolean;
        lang?: string;
    }
}) => {
    switch (action.type) {
        case 'UI_DARKMODE':
            return Object.assign({}, state, {
                darkMode: action.payload.darkMode
            });
        case 'UI_LANG':
            return Object.assign({}, state, {
                lang: action.payload.lang
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
