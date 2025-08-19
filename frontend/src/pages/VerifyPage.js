import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/Firebase'
import { reload } from 'firebase/auth'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/authcontext'

function VerifyPage() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [infoMessage] = useState(
    'Check your email inbox and verify your account.'
  )
  const {userLoggedIn} = useAuth();
  const user = auth.currentUser;

  const handleIHaveVerified = async () => {
    if (!auth.currentUser) {
      setErrorMessage('No user signed in.')
      return
    }
    try {
      // Refresh user to check updated verification status
      await reload(auth.currentUser)
      console.log(auth.currentUser.emailVerified)
      if (auth.currentUser.emailVerified) {
        navigate('/') // ✅ only redirect when actually verified
      } else {
        setErrorMessage('Still not verified. Please check again later.')
      }
    } catch (err) {
      setErrorMessage(err?.message || 'Something went wrong.')
    }
  }

  return (
    <main>
      {(!userLoggedIn || user.emailVerified) && <Navigate to="/" replace={true} />}
      <div>
        <h2>Verify Your Email</h2>
        <p>{infoMessage}</p>
        {errorMessage && <p>{errorMessage}</p>}
        <button onClick={handleIHaveVerified}>I have verified</button>
      </div>
    </main>
  )
}

export default VerifyPage
