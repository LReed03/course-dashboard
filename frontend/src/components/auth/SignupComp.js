import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authcontext'
import { auth } from '../../firebase/Firebase'
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth'
import "../../styles/SignupComp.css";
import { signup } from '../../api/AuthAPI'
import { doSignInWithGoogle } from '../../firebase/Auth'

function SignupComp() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSigningIn, setIsSigningIn] = useState("")

  const { userLoggedIn } = useAuth()

  const onSubmit = async (e) => {
    e.preventDefault()
    if (isRegistering) return

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.")
      return
    }

    setIsRegistering(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      // 1. Create user
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      console.log(user.user)
      // 2 . Send verification email
      await signup();
      await sendEmailVerification(user)

      // 3. Show message + redirect
      setSuccessMessage("Verification email sent — check your inbox.")
    } 
    catch (err) {
      setErrorMessage(err?.message || "Sign up failed.")
    } 
    finally {
      setIsRegistering(false)
    }
  }

  const onGoogleSignUp = async (e) =>{
          e.preventDefault();
          if(!isSigningIn){
              setIsSigningIn(true);
              doSignInWithGoogle().catch(err => {
                  setErrorMessage("Error signing up");
                  setIsSigningIn(false);
              });
              await signup();
              
          }
      }

  return (
    <>
      {userLoggedIn && <Navigate to="/verifypage" replace={true} />}

      <main className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <h3>Create a New Account</h3>
          </div>

          <form onSubmit={onSubmit} className="signup-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="signup-input"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="signup-input"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="off"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="signup-input"
              />
            </div>
            

            {errorMessage && (
              <span className="error-message">{errorMessage}</span>
            )}
            {successMessage && (
              <span className="success-message">{successMessage}</span>
            )}

            <button
              type="submit"
              disabled={isRegistering}
              className="signup-button"
            >
              {isRegistering ? 'Signing Up...' : 'Sign Up'}
            </button>

            <div className="login-redirect">
              Already have an account?{' '}
              <Link to="/login" className="login-link">
                Continue
              </Link>
            </div>
            <div className="divider">
              <span>OR</span>
            </div>
            <button
                  disabled={isSigningIn}
                  onClick={(e) => { onGoogleSignUp(e) }}
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
              {isSigningIn ? 'Signing Up...' : 'Sign up with Google'}
            </button>
          </form>
        </div>
      </main>
    </>
  )
}

export default SignupComp
