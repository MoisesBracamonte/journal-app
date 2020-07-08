import React from 'react';
import Sidebar from './Sidebar';
import NothingSelected from './NothingSelected';
import NoteScreen from '../notes/NoteScreen';
import { useSelector } from 'react-redux';

const JournalScreen = () => {
    const notes = useSelector(state => state.notes);
    
    return (
        <div className="journal__main-content">
            <Sidebar />
            <main>
                {
                    (notes.active)
                    ? <NoteScreen />
                    : <NothingSelected />
                }
            </main>
        </div>
    )
}

export default JournalScreen
