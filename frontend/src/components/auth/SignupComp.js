import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authcontext'
import { auth } from '../../firebase/Firebase'
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth'
import { doSignOut } from '../../firebase/Auth'

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
      await sendEmailVerification(user)

      // 3. Show message + redirect
      setSuccessMessage("Verification email sent — check your inbox.")
      navigate('/verifypage')   // 👈 go to VerifyPage
    } catch (err) {
      setErrorMessage(err?.message || "Sign up failed.")
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <>
      {userLoggedIn && <Navigate to="/" replace={true} />}

      <main>
        <div>
          <div>
            <h3>
              Create a New Account
            </h3>
          </div>

          <form onSubmit={onSubmit}>
            <div>
              <label>Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label>Password</label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label>Confirm Password</label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="off"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {errorMessage && (
              <span>{errorMessage}</span>
            )}
            {successMessage && (
              <span>{successMessage}</span>
            )}

            <button
              type="submit"
              disabled={isRegistering}
            >
              {isRegistering ? 'Signing Up...' : 'Sign Up'}
            </button>

            <div>
              Already have an account?{' '}
              <Link to="/login">
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
