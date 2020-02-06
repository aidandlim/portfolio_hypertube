const data = {
    darkMode: false,
    lang: 'en',
    from: '/'
};

const reducer = (state = data, action) => {
    switch (action.type) {
        case 'UI_DARKMODE':
            return Object.assign({}, state, {
                darkMode: action.payload.darkMode
            });
        case 'UI_LANG':
            return Object.assign({}, state, {
                lang: action.payload.lang
            });
        case 'UI_FROM':
            return Object.assign({}, state, {
                lang: action.payload.lang
            });
        default:
            return state;
    }
};

export default reducer;
