import React, { useContext, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import userContext from '../context/users/UserContext';


export const Login = () => {

    const context = useContext(userContext);
    const {login} = context;
    const history =  useHistory()
    const [cred, setCred] = useState({
        email : "",
        password : ""
    })

    const onChange = (e) => {
        setCred({...cred, [e.target.name] : e.target.value});
    }

    const handleClick = (e) => {
        e.preventDefault();
        // console.log(cred)
        login(cred.email, cred.password);
        // if(login(cred.email, cred.password)){
            history.push('/')
        // }
    }

    return (
        <div className='bg-light min-vh-100 pt-5 text-center'>
            <div className="auth-container p-5">
                <h1 className='text-warning mt-5'>Sign In to iKeepNotes</h1>
                <form action="" className='mb-5'>
                    <input type="text" className="auth-input form-control mt-5 mb-3" placeholder='Email' name="email" id="email" onChange={onChange}/>
                    <input type="text" className="auth-input form-control" placeholder='Password' name="password" id="password" onChange={onChange}/>
                    <button className='btn auth-button btn-warning mt-3' onClick={handleClick}>Sign In</button>
                    <Link className="auth-link" to="/register"><p className='mt-2'><span className='auth-link-light'>Not Registered?</span> Sign Up Now</p></Link>
                </form>
            </div>
        </div>
    )
}
