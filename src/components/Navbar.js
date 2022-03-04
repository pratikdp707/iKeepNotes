import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import userContext from '../context/users/UserContext';
import {removeCookie, removeLocalStorage} from '../helpers/auth'

export const Navbar = () => {

    const history = useHistory();
    const context = useContext(userContext);
    const {user} = context;

    const handleClick = (e) => {
        e.preventDefault();
        removeCookie('authToken')
        removeLocalStorage('name');
        removeLocalStorage('email');
        removeLocalStorage('id');
        history.push('/login');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-warning fixed-top">
                <div className="container">
                    <a className="navbar-brand fw-bold fs-3" href="/">iKeepNotes</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <h4 className='text-white pt-2 ms-auto'>{user.name ? user.name.substring(1, user.name.length-1) : ""}</h4>
                        <button className='ms-3 btn btn-light text-warning' onClick={handleClick}>Log Out</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}
