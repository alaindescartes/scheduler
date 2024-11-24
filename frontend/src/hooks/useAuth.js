import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../store/user/userSlice"
import { setUser } from "../store/user/userSlice"

function useAuth() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
          dispatch(logout())
        }
        //add the user details to the userSlice
        let user = response.data.user
        dispatch(setUser(user))
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login")
          dispatch(logout())
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
