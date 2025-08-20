import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/Firebase'
import { reload } from 'firebase/auth'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/authcontext'
import { doSendEmailVerification } from '../firebase/Auth'
import "../styles/VerifyPage.css";
import Header from '../components/Header'
import Footer from '../components/Footer'


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
    try{
      await doSendEmailVerification()
      setMessage("Verification Email Resent! Check your inbox!!")
    }
    catch(error){
      setMessage("Sorry you must wait before sending another email!")
    }
     
  }

   return (
    <div className='verify-page'>
      <Header/>
      <main className="verify-container">
          {(!userLoggedIn || user.emailVerified) && <Navigate to="/Dashboard" replace={true} />}
          <div className="verify-card">
            <h2 className="verify-title">Verify Your Email</h2>
            <p className="verify-info">{infoMessage}</p>
            {message && <p className="verify-message">{message}</p>}
            <div className="verify-actions">
              <button className="btn btn-primary" onClick={handleIHaveVerified}>I have verified</button>
              <button className="btn btn-secondary" onClick={resendVerificationEmail}>Resend Verification Email</button>
            </div>
          </div>
        </main>
        <Footer/>
      </div>
    )
  }
export default VerifyPage
