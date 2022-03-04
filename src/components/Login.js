import React, { useContext, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import userContext from '../context/users/UserContext';
import { ToastContainer, toast } from 'react-toastify'

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

    const handleClick = async (e) => {
        e.preventDefault();
        if(await login(cred.email, cred.password)){
            toast.success("Log In successfull");
            history.push('/')
        } else {
            toast.error("Wrong email or password")
        }
    }

    return (
        <div className='bg-light min-vh-100 pt-5 text-center'>
            <ToastContainer />
            <div className="auth-container p-5">
                <h1 className='text-warning mt-5'>Sign In to iKeepNotes</h1>
                <form action="" className='mb-5'>
                    <input type="email" className="auth-input form-control mt-5 mb-3" placeholder='Email' name="email" id="email" onChange={onChange}/>
                    <input type="password" className="auth-input form-control" placeholder='Password' name="password" id="password" onChange={onChange}/>
                    <button className='btn auth-button btn-warning mt-3' onClick={handleClick}>Sign In</button>
                    <Link className="auth-link" to="/register"><p className='mt-2'><span className='auth-link-light'>Not Registered?</span> Sign Up Now</p></Link>
                </form>
            </div>
        </div>
    )
}
