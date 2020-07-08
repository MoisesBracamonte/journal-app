const { UI_ERROR, UI_SET_ERROR } = require("./types");

const initialState = {
    loading : false,
    msg: ""
}

export const uiReducers = (state = initialState, action) => {

    const { type, payload } = action;
    switch(type){
        case UI_ERROR:
            return { ...payload }
        case UI_SET_ERROR:
            return initialState;
        default:
            return state;
    }
}