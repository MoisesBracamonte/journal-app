import { NOTE_ACTIVE, NOTE_LOAD, NOTE_UPDATE, NOTE_DELETE, NOTE_LOGOUT_CLEANING } from "./types";

const initState = {
    notes:[],
    active: null
}
export const notesReducers = (state = initState, action) => {
    const { type, payload } = action;

    switch( type ){
        case NOTE_ACTIVE:

            return {
                ...state,
                active:{
                    ...payload
                }
            }
        
        case NOTE_LOAD:
            return{
                ...state,
                notes: [ ...payload ]
            }
        
        case NOTE_UPDATE:
            return {
                ...state,
                notes: state.notes.map( x => {
                    return x.id === payload.note.id ? payload.note : x
                })
            }
        
        case NOTE_DELETE:

            return{
                ...state,
                active:null,
                notes:[ ...payload.notes ]
            }
        
        case NOTE_LOGOUT_CLEANING:
            return { ...initState }
              
        default:
            return state;
    }
}
