import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { startUpdateNote, startUploadImage } from '../../redux/notes/actions';
import { uploadPicture } from '../../firebase/noteCollections';
import { rewriteImage } from '../../helper/image';

const NotesAppBar = () => {

    const dispatch = useDispatch();
    const {active:onNote} = useSelector( state => state.notes );
    
    const handleSaveNoteClick = () => {
        dispatch( startUpdateNote( onNote ) )
    }

    const handlePictureChange = (e) => {
        var picture = rewriteImage( e.target.files[0], onNote.id);
        var url = uploadPicture( picture );
        dispatch( startUploadImage(url));
    }


    return (
        <div className="notes__appbar">
            <span> 31 de julio 1992</span>
            <div>
                <label htmlFor="file-upload"> Picture </label>
                <input type="file" id="file-upload"  hidden onChange={ (e) => handlePictureChange(e) }/>
                <button className="btn"
                onClick={ handleSaveNoteClick }> Save </button>
            </div>
        </div>
    )
}

export default NotesAppBar;
