import React from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { useForm, ErrorMessage } from "react-hook-form";
import LoginImage from '../../images/loginImage.svg'
import './sign-in-up.css'

export default function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <div className='sign-in'>
            <div className="sign-in-left-container">
                <div className="sign-in-left-wrapper">
                    <h2>Login</h2>
                    <p>Find the right fit for your passion</p>
                    <div className="google-sign-in">
                        <Link to=""><FcGoogle className='FcGoogle'/> Sign in with Google</Link>
                    </div>
                    <h3><span>or Sign in with Email</span></h3>
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="form-label">Email<span>*</span></label>
                        <input id='email' placeholder="Enter your email" {...register("email")} />
                        <label className="form-label">Password<span>*</span></label>
                        <input id='password' type={"password"} placeholder='Enter your password' {...register("password", { required: true })} />
                        {/*errors.password && <span>This field is required</span>*/}
                        <div className="remember-forgot">
                            <label className='remember-me-checkbox'>
                                <input type="checkbox" />
                                Remember me
                            </label>
                            <Link to="">Forgot password?</Link>
                        </div>
                        <input id="login-submit" type="submit" value="Login" />
                    </form>
                    <p className='not-registered'>Not registered yet? 
                        <Link to="/signup"> Create an Account</Link>
                    </p>
                </div>
            </div>
            <div className="sign-in-right-container">
                <div className="sign-in-right-wrapper">
                    <img src={LoginImage} alt="login-image" />
                </div>
            </div>
        </div>
    )
}
