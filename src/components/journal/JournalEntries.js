import React from 'react';
import JournalEntry from './JournalEntry';
import { useSelector } from 'react-redux';

const JournalEntries = () => {
    
    const entries = useSelector(state => state.notes );
    
    return ( 
        <div className="journal__entries">
            {
                entries.notes.map(x => (
                    <JournalEntry key={ x.id } { ...x } />
                ))
            }
        </div>
    )
}

export default JournalEntries;