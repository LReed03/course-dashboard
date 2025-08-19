import React from 'react'
import { Navigate } from 'react-router-dom'
import { auth } from '../../firebase/Firebase'

const RequireVerified = ({ children }) => {
  const user = auth.currentUser

  if (!user) {
    return <Navigate to="/login" />
  }

  if (!user.emailVerified) {
    return <Navigate to="/verifypage" />
  }

  return children
}

export default RequireVerified
