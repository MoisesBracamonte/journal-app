import { storage, db } from './config';

export const loadNotes = async ( uid ) => {
    const notes = [];
    const noteSnapshot = await db.collection(`${uid}/journal/notes/`).get();
    noteSnapshot.forEach( doc => {
        notes.push({
            id : doc.id,
            ...doc.data()
        })
    })
    return notes;
}

export const  uploadPicture = ( picture ) => {
    const uPicture = storage.ref(`images/${ picture.name }`).put( picture );
    return uPicture;
}


