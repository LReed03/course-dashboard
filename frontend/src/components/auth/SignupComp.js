import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authcontext'
import { auth } from '../../firebase/Firebase'
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth'
import "../../styles/SignupComp.css";
import { signup } from '../../api/AuthAPI'

function SignupComp() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

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
          </form>
        </div>
      </main>
    </>
  )
}

export default SignupComp
