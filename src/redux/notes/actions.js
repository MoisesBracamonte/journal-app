import { db } from "../../firebase/config";
import { NOTE_ACTIVE, NOTE_LOAD, NOTE_UPDATE, NOTE_DELETE, NOTE_LOGOUT_CLEANING } from "./types";
import { loadNotes } from "../../firebase/noteCollections";
import Swal from "sweetalert2";

export const startNewNote = () => {
    return async (dispatch, state) => {

        const { auth } = state();
        const { uid } = auth;

        const newNote = {
            title: '',
            note: '',
            date: new Date().getTime()
        };

        const docRef = await db.collection(`${uid}/journal/notes/`).add(newNote);  /* Grabar en firestore */
        dispatch( activeNote(docRef.id, newNote) );
        dispatch( startLoadNotes( uid )  );

    }
}

export const activeNote = (id, note) => {
    return {
        type: NOTE_ACTIVE,
        payload: {
            id,
            ...note
        }
    }
}

export const getNotes = (notes) => {
    return {
        type: NOTE_LOAD,
        payload: notes
    }
}

export const startLoadNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(getNotes(notes));
    }
}


/**
 * 0. Obtenemos el uid del usuario
 * 1. Eliminamos el Id ya que en nuestra base no se almacena en el documento.
 * 2. Validamos de que la url no venga en null, si viene borramos.
 * 3. Almacenos la información. 
 * 4. Actualizamos la lista de los datos en el sidebar.
 */
export const startUpdateNote = (note) => {
    // Como es una llamada async la actualización utilizamos thunk. 
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        if (!note.url) {
            delete note.url;
        }
        const replyNote = { ...note }
        delete replyNote.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(replyNote);
        dispatch(refreshStoreNote(note));
        Swal.fire("Saved", note.title, 'success');
    }
}

/*  Actualizamos la nota que se modifico  */
export const refreshStoreNote = (note) => {
    return {
        type: NOTE_UPDATE,
        payload: {
            note: note
        }
    }
}

export const startUploadImage = (image) => {
    return (dispatch, getState) => {
        image.on("state_changed", snapshot => {
            Swal.fire({
                title: 'Uploading',
                text: 'Please wait...',
                allowOutsideClick: false,
                onBeforeOpen: () => { Swal.showLoading() }
            });

        }, error => { }, () => {
            image.snapshot.ref.getDownloadURL()
                .then((url) => {
                    const { active: onNote } = getState().notes;
                    onNote.url = url;
                    dispatch(startUpdateNote(onNote))
                    Swal.close();
                })
        })
    }
}

/*
1.  Acá procedemos a la eliminación de la nota en el firebase. 
2.  Disparamos otra opción que es la encargada de elimiar y actulizar nuestra tienda. 
*/
export const startDeleteNote = ( noteId ) => {
    return  async ( dispatch, state ) => {
        const { uid } = state().auth;
        const { notes } = state().notes;
        const setNotes = notes.filter( x => x.id !== noteId );
        await db.doc(`${ uid }/journal/notes/${ noteId }`).delete();
        dispatch( deleteNote( setNotes ) );
    }   

}

export const deleteNote = ( notes ) => {
    return {
        type: NOTE_DELETE,
        payload:{
            notes
        }
    }
}

export const cleaningNotes = () => {

    return {
        type: NOTE_LOGOUT_CLEANING,
    }

}