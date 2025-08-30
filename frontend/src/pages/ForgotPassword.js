import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ForgotPassword.css";
import { Link } from "react-router-dom";

function ForgotPassword(){
    const [email, setEmail] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
    }

    return(
        <div>
            <Header/>
            <div className="forgot-password-body">
                <form className="forgot-password-container" onSubmit={onSubmit}>
                    <h2>Reset Password</h2>
                    <p>Provide the email associated with your account to recover your password.</p>
                    <label htmlFor="email">Email</label>
                    <input type="email" autoComplete="email" 
                        value={email}  
                        onChange={(e) => { setEmail(e.target.value) }} 
                        name="email" 
                        placeholder="Enter Your Email" 
                        required>
                    </input>
                    <button type="submit">Reset Password</button>
                    <Link to='/login'>Back to Login</Link>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default ForgotPassword;