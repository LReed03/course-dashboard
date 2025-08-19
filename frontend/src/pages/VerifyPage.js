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
    <main className="w-full h-screen flex items-center justify-center">
      {(!userLoggedIn || user.emailVerified) && <Navigate to="/" replace={true} />}
      <div className="w-96 text-gray-600 space-y-5 p-6 shadow-xl border rounded-xl text-center">
        <h2 className="text-xl font-bold">Verify Your Email</h2>
        <p className="text-sm text-gray-600">{infoMessage}</p>

        {errorMessage && <p className="text-red-600 font-bold">{errorMessage}</p>}

        <button
          onClick={handleIHaveVerified}
          className="w-full px-4 py-2 text-white font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
        >
          I have verified
        </button>
      </div>
    </main>
  )
}

export default VerifyPage
