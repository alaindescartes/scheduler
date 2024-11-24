import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function useAuth() {
  const navigate = useNavigate()
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/auth/check-session`,
          {
            withCredentials: true,
          }
        )

        if (response.status !== 200) {
          navigate("/login")
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login")
        } else {
          console.log("Error during authentication check:", error.message)
        }
        console.log("error while checking authentication: " + error)
      }
    }
    checkAuth()
  }, [navigate])
}

export default useAuth
