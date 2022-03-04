import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import userContext from '../context/users/UserContext'
import { useHistory } from 'react-router-dom'
import {toast, ToastContainer } from 'react-toastify'

export const Register = () => {

    const [user, setUser] = useState({
        email : "",
        password : "",
        name : ""
    })
    const history = useHistory();

    const context = useContext(userContext);
    const {register} = context;

    const onChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value});
    }

    const handleClick = async (e) => {
        e.preventDefault();
        if(await register(user.name, user.email, user.password)){
            toast.success("Registration Successfull!!!")
            toast.success("Redirecting to Sign In Page")
            setTimeout(() => {
                history.push('/login');    
            }, 5000);
            
        } else {
            toast.error("Please try once again.")
        }
    }

    return (

        <div className='bg-light min-vh-100 pt-5'>
            <ToastContainer/>
            <div className="auth-container p-5">
                <h1 className='text-warning mt-5'>Sign Up for iKeepNotes</h1>
                <form action="" className='mb-5'>
                    <input type="text" className="auth-input form-control mt-5 mb-3" placeholder='Name' name="name" minLength={3} required id="name" onChange={onChange}/>
                    <input type="email" className="auth-input form-control mb-3" placeholder='Email' name="email" id="email" required onChange={onChange}/>
                    <input type="password" className="auth-input form-control" minLength={5} required placeholder='Password (min 5 characters)' name="password" id="password" onChange={onChange}/>
                    <button disabled={user.name.length < 3 || user.password.length < 5} className='btn auth-button btn-warning mt-3' onClick={handleClick}>Sign Up</button>
                    <Link to="/login" className="auth-link"><p className='mt-2'><span className='auth-link-light'>Already Registered?</span> Sign In Now</p></Link>
                </form>
            </div>
        </div>
    )
}
