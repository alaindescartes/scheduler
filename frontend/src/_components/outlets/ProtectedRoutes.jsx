import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

function ProtectedRoutes({ children }) {
  useAuth()
  const isAuthenticated = useSelector(
    (state) => state.user.user.isAuthenticated
  )
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default ProtectedRoutes
