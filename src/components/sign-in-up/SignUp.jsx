import React from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { useForm, ErrorMessage } from "react-hook-form";
import SignupImage from '../../images/signupImage.svg'
import './sign-in-up.css'

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <div className='sign-up'>
            <div className="sign-up-left-container">
                <div className="sign-up-left-wrapper">
                    <h2>Sign Up</h2>
                    <p>Find the right fit for your passion</p>
                    <div className="google-sign-in">
                        <Link to=""><FcGoogle className='FcGoogle'/> Sign in with Google</Link>
                    </div>
                    <h3><span>or Sign up with Email</span></h3>
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="form-label">Email<span>*</span></label>
                        <input id='email' placeholder="Enter your email" {...register("email")} />
                        <label className="form-label">Password<span>*</span></label>
                        <input id='password' type={"password"} placeholder='Enter new password' {...register("password", { required: true })} />
                        <label className="form-label">Confirm Password<span>*</span></label>
                        <input id='confirm-password' type={"password"} placeholder='Re-enter password' {...register("confirmPassword", { required: true })} />
                        {/*errors.password && <span>This field is required</span>*/}
                        <div className="terms">
                            <label className='terms-checkbox'>
                                <input type="checkbox" />
                                I agree to the Terms & Conditions
                            </label>
                        </div>
                        <input id="signup-submit" type="submit" value="Sign Up" />
                    </form>
                    <p className='already-registered'>Already have an Account? 
                        <Link to="/signin"> Sign in</Link>
                    </p>
                </div>
            </div>
            <div className="sign-up-right-container">
                <div className="sign-up-right-wrapper">
                    <img src={SignupImage} alt="signup-image" />
                </div>
            </div>
        </div>
    )
}
