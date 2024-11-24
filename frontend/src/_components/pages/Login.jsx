// import dotenv from 'dotenv';
// dotenv.config({path:"../frontend/.env"});
import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom" // React Router for navigation
import { toast } from "sonner"
import { resetErrorState, setErrorState } from "../../store/error/errorSlice.js"
import {
  resetLoadingState,
  setLoadingState,
} from "../../store/loading/loadingSlice.js"
import { setUser } from "../../store/user/userSlice.js"

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const isLoading = useSelector((state) => state.loading.isLoading)
  const error = useSelector((state) => state.error.error)
  const errorMessage = useSelector((state) => state.error.errorMessage)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.user)

  // Handle input change
  function handleChange(e) {
    dispatch(resetErrorState())
    dispatch(resetLoadingState())
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Validate form inputs
  function validateForm() {
    return !formData.username || !formData.password
  }

  // Handle form submission
  async function handleFormSubmission(e) {
    dispatch(setLoadingState(true))
    e.preventDefault()

    // Validate the form
    if (validateForm()) {
      dispatch(setErrorState("All fields are required"))
      return
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        formData,
        { withCredentials: true }
      )
      if (response.status === 200) {
        dispatch(setUser(response.data.user))
        navigate("/homepage")
        dispatch(resetLoadingState())
        dispatch(resetErrorState())
        toast("Logged in successfully", {
          style: {
            color: "white",
            background: "green",
          },
        })
      }
    } catch (err) {
      if (err.response) {
        // Server responded with an error
        console.error("Server error:", err.response.data.message)
        dispatch(setErrorState(err.response.data.message))
      } else if (err.request) {
        // Request was made but no response received
        console.error("Network error:", err.request)
        dispatch(setErrorState("Network error. Please try again."))
      } else {
        // Other errors
        console.error("Unexpected error:", err.message)
        dispatch(setErrorState("An unexpected error occurred."))
      }
    } finally {
      dispatch(resetLoadingState())
    }
  }

  return (
    <div className="border-4 border-slate-200 bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-slate-700 text-center font-extrabold mb-6">
        Welcome to Momentum
      </h1>
      {error && (
        <div className="text-center mb-4">
          <span className="text-sm text-red-700">{errorMessage}</span>
        </div>
      )}
      <form className="flex flex-col space-y-4" onSubmit={handleFormSubmission}>
        {/* Username Field */}
        <label
          htmlFor="username"
          className="text-slate-600 font-medium text-sm"
        >
          Username
        </label>
        <input
          type="text"
          onChange={handleChange}
          id="username"
          name="username"
          className="border border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2 text-sm outline-none"
        />

        {/* Password Field */}
        <label
          htmlFor="password"
          className="text-slate-600 font-medium text-sm"
        >
          Password
        </label>
        <input
          type="password"
          onChange={handleChange}
          id="password"
          name="password"
          className="border border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2 text-sm outline-none"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg shadow-lg transition-all"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>

      {/* Other login options */}
      <div className="flex flex-col gap-6 justify-center">
        <div className="flex items-center space-x-2 mt-12">
          <div className="flex-grow border-t border-slate-300"></div>
          <span className="text-slate-500 text-sm font-medium">OR</span>
          <div className="flex-grow border-t border-slate-300"></div>
        </div>

        <button
          disabled={isLoading}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg shadow-lg transition-all w-full"
        >
          LOGIN WITH GOOGLE
        </button>
        <a
          href="#"
          className="text-sm text-blue-500 font-semibold underline hover:text-blue-900"
        >
          Forgot your password?
        </a>
        <a
          href="/sign-up"
          className="text-sm text-blue-500 font-semibold underline hover:text-blue-900"
        >
          Not registered? Sign up.
        </a>
      </div>
    </div>
  )
}

export default Login
