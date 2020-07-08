import React from 'react';
import JournalEntries from './JournalEntries';
import { useDispatch,useSelector } from 'react-redux';
import { startLogout } from '../../redux/auth/actions';
import { startNewNote } from '../../redux/notes/actions';



const Sidebar = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);

    const handleLogoutClick = () => {
        dispatch( startLogout() );
    }

    const handleAddEntry = () => {
        dispatch( startNewNote() );
    }

    return(
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <span>{ user.displayName }</span>
                </h3>
                <button className="mt-5 btn journal__btn-logout"
                onClick={ handleLogoutClick }
                >Logout</button>

            </div>
            <div className="journal__new-entry"
            onClick={ handleAddEntry }>
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">New entry</p>
            </div>
            <JournalEntries/>
        </aside>    
    )
}

export default Sidebar;