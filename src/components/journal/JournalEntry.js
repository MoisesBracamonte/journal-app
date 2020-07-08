import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../redux/notes/actions';


const JournalEntry = ({ id, title, note, date, url }) => {

    const dispatch = useDispatch();
    const noteDate = moment(date);

    const handleViewNote = () => {
        dispatch( activeNote( id, {
            title, note, date, url
        }))
    }

    return (
        <div className="journal__entry pointer"
        onClick={ handleViewNote }>

            {
                url &&
                    (<div className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url( ${ url } )`
                    }}></div>)
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title"> { title } </p>
                <p className="journal__entry-content">
                   { note }
                </p>
            </div>

            <div className="journal__entry-date-box">
            <span>{ noteDate.format('dddd') }</span>
                    <h4>{ noteDate.format('	Do') }</h4>
            </div>
        </div>
    )
}

export default JournalEntry;