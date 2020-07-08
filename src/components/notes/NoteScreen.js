import React, { useState, useEffect, useRef } from 'react'
import NotesAppBar from './NotesAppBar';
import { useSelector, useDispatch } from 'react-redux';
import { activeNote, startDeleteNote } from '../../redux/notes/actions';

const NoteScreen = () => {

    const dispatch = useDispatch();
    const { active: onNote } = useSelector(state => state.notes);
    const [stateForm, setStateForm] = useState(onNote)
    const activeId = useRef(onNote.id);
    const { title, note, url } = stateForm;

    useEffect(() => {

        if (onNote.id !== activeId.current) {
            setStateForm(onNote);
            activeId.current = onNote.id;
        }

    }, [onNote]);


    const handleInputChange = (e) => {

        setStateForm({
            ...stateForm,
            [e.target.name]: e.target.value
        })
    }

    const handleDelNoteClick = () => {
        console.log("Click delete");
        /*  Se debe disparar una acción donde elimine la información del fireStore, e elimine la información almacenada en el Stora de la app. */
        dispatch( startDeleteNote(activeId.current) );
    }

    useEffect(() => {
        dispatch(activeNote(onNote.id, { ...stateForm }))
    }, [stateForm, dispatch]);

    return (
        <div className="notes__main-content">
            <NotesAppBar />
            <div className="notes__content">

                <input
                    type="text"
                    name="title"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    onChange={(e) => handleInputChange(e)}
                />

                <textarea
                    name="note"
                    placeholder="What happend today"
                    className="notes__textarea-input"
                    value={note}
                    onChange={(e) => handleInputChange(e)}
                ></textarea>

                <div className="notes__footer">
                    <div className="notes__images">
                        {
                            onNote.url &&
                            (<img
                                width="20%"
                                heigth="20%"
                                src={onNote.url}
                                alt="img"
                            />)
                        }
                    </div>
                    <div className="notes__button-del">
                        <a
                            onClick={handleDelNoteClick}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteScreen;
