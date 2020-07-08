import { UI_ERROR, UI_SET_ERROR } from './types';

export const getError = (error) => {
    return {
        type: UI_ERROR,
        payload: {
            loading:true,
            msg: error
        }
    }
}

export const setError = () => ({ type: UI_SET_ERROR })