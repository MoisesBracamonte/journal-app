const { LOGIN, LOGOUT } = require("./types");

export const authReducers = ( state= {} , action) => {
    const { type, payload } = action;
    switch (type) {
        case LOGIN:
            return { ...state, ...payload };
        case LOGOUT :
            return {};
        default :
            return state;
    }
}