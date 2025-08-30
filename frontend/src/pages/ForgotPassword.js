import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ForgotPassword.css";
import { Link } from "react-router-dom";
import { doPasswordReset } from "../firebase/Auth";

function ForgotPassword(){
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await doPasswordReset(email);
            setEmailSent(true);  
        } 
        catch (err) {
            console.error("Password reset failed:", err);
            setEmailSent(false); 
            setErrorMessage("Invalid Email")
        }
    };


    return(
        <div>
            <Header/>
            <div className="forgot-password-body">
                {!emailSent ? <form className="forgot-password-container" onSubmit={onSubmit}>
                    <h2>Reset Password</h2>
                    <p>Provide the email associated with your account to recover your password.</p>
                    <label htmlFor="email">Email</label>
                    <input type="email" autoComplete="email" 
                        value={email}  
                        onChange={(e) => { 
                            setEmail(e.target.value);
                            setErrorMessage("");
                         }} 
                        name="email" 
                        placeholder="Enter Your Email" 
                        required>
                    </input>
                    <p className="error">{errorMessage}</p>
                    <button type="submit">Reset Password</button>
                    <Link to='/login'>Back to Login</Link>
                    
                </form> : <div className="forgot-password-container">
                    <h2>Email sent</h2>
                    <p>A reset link has been sent to your email. Be sure to check your Spam or Junk folder if it doesn’t appear in your inbox.</p>
                    <Link to='/login'>Back to Login</Link>
                    </div>}
            </div>
            <Footer/>
        </div>
    )
}

export default ForgotPassword;