import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/Firebase'
import { reload } from 'firebase/auth'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/authcontext'
import { doSendEmailVerification } from '../firebase/Auth'

function VerifyPage() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [infoMessage] = useState(
    'Check your email inbox and verify your account.'
  )
  const {userLoggedIn} = useAuth();
  const user = auth.currentUser;

  const handleIHaveVerified = async () => {
    if (!auth.currentUser) {
      setMessage('No user signed in.')
      return
    }
    try {
      // Refresh user to check updated verification status
      await reload(auth.currentUser)
      console.log(auth.currentUser.emailVerified)
      if (auth.currentUser.emailVerified) {
        navigate('/') // ✅ only redirect when actually verified
      } else {
        setMessage('Still not verified. Please check again later.')
      }
    } catch (err) {
      setMessage(err?.message || 'Something went wrong.')
    }
  }

  const resendVerificationEmail = async () =>{
     await doSendEmailVerification()
     setMessage("Verification Email Resent! Check your inbox!!")
  }

  return (
    <main>
      {(!userLoggedIn || user.emailVerified) && <Navigate to="/Dashboard" replace={true} />}
      <div>
        <h2>Verify Your Email</h2>
        <p>{infoMessage}</p>
        {message && <p>{message}</p>}
        <button onClick={handleIHaveVerified}>I have verified</button>
        <button onClick={resendVerificationEmail}>Resend Verification Email</button>
      </div>
    </main>
  )
}

export default VerifyPage
