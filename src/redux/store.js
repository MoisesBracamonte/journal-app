import { createStore, combineReducers,compose,applyMiddleware } from  'redux';
import  thunk from 'redux-thunk';

import { authReducers } from './auth/authReducers';
import { uiReducers } from './ui/uiReducers';
import { notesReducers } from './notes/notesReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const multipleStore = combineReducers({
    auth: authReducers,
    ui: uiReducers,
    notes: notesReducers
});

export const store = createStore(
    multipleStore,
    composeEnhancers( applyMiddleware(thunk) )
);