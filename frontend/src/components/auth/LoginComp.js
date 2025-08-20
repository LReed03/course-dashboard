import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../../firebase/Auth";
import { useAuth } from "../../contexts/authcontext";
import "../../styles/LoginComp.css";

function LoginComp(){
    const {userLoggedIn} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const authErrorMsg = (code) => {
        switch (code) {
            case "auth/invalid-credential":
            case "auth/wrong-password":
            case "auth/user-not-found":
            return "Email or password is incorrect.";
            case "auth/invalid-email":
            return "Please enter a valid email address.";
            case "auth/too-many-requests":
            return "Too many attempts. Try again later or reset your password.";
            case "auth/network-request-failed":
            return "Network error. Check your connection.";
            default:
            return "Something went wrong. Please try again.";
        }
        };

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isSigningIn){
            setIsSigningIn(true);
            await doSignInWithEmailAndPassword(email, password).catch(err => {
                setErrorMessage(authErrorMsg(err.code));
                setIsSigningIn(false);
            });
        }

    }
    const onGoogleSignIn = (e) =>{
        e.preventDefault();
        if(!isSigningIn){
            setIsSigningIn(true);
            doSignInWithGoogle().catch(err => {
                setErrorMessage(authErrorMsg(err.code));
                setIsSigningIn(false);
            });
        }
    }
    return(
        <div className="login-container">
            {userLoggedIn && (<Navigate to={'/dashboard'} replace={true} />)}

            <main className="login-card">
                <div className="login-header">
                    <h3>Welcome Back</h3>
                </div>

                <form onSubmit={onSubmit} className="login-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            autoComplete='email'
                            required
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            className="login-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            autoComplete='current-password'
                            required
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            className="login-input"
                        />
                    </div>

                    {errorMessage && (
                        <span className="error-message">{errorMessage}</span>
                    )}

                    <button
                        type="submit"
                        disabled={isSigningIn}
                        className="login-button"
                    >
                        {isSigningIn ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <p className="signup-text">
                    Don't have an account?{" "}
                    <Link to='/signup' className="signup-link">Sign up</Link>
                </p>

                <div className="divider">
                    <span>OR</span>
                </div>

                <button
                    disabled={isSigningIn}
                    onClick={(e) => { onGoogleSignIn(e) }}
                    className="google-button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="google-icon">
                        <path fill="#4285F4" d="M47.5 24.6c0-1.6-.1-3.3-.4-4.8H24v9.1h13.3c-.6 3.2-2.5 5.9-5.3 7.7v6.4h8.6c5-4.6 7.9-11.3 7.9-18.4z"/>
                        <path fill="#34A853" d="M24 48c7.2 0 13.2-2.4 17.6-6.5l-8.6-6.4c-2.4 1.6-5.6 2.6-9 2.6-6.9 0-12.7-4.6-14.8-10.9H.4v6.7C4.8 42.1 13.7 48 24 48z"/>
                        <path fill="#FBBC05" d="M9.2 27.8c-.6-1.6-1-3.4-1-5.3s.4-3.7 1-5.3v-6.7H.4C-1.2 13.5-2 18.7-2 24s.8 10.5 2.4 15.3l8.8-6.5z"/>
                        <path fill="#EA4335" d="M24 9.5c3.9 0 7.5 1.3 10.2 3.9l7.6-7.6C36.9 2 31 0 24 0 13.7 0 4.8 5.9.4 14.6l8.8 6.5C11.3 14.1 17.1 9.5 24 9.5z"/>


                        <defs>
                            <clipPath id="clip0_17_40">
                                <rect width="48" height="48" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                </button>
            </main>
        </div>
    )
}

export default LoginComp;