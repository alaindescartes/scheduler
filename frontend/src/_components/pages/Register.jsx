import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import {
  resetErrorState,
  setErrorState,
} from "../../store/error/errorSlice.js";
import {
  resetLoadingState,
  setLoadingState,
} from "../../store/loading/loadingSlice.js";

function Register() {
  // Initialize state
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });
  const isLoading = useSelector((state) => state.loading.isLoading);
  const error = useSelector((state) => state.error.error);
  const errorMessage = useSelector((state) => state.error.errorMessage);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // React Router navigation

  // Handle input change
  function handleChange(e) {
    dispatch(resetErrorState());
    dispatch(resetLoadingState());
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Validate form inputs
  function validateForm() {
    return (
      !formData.firstname ||
      !formData.lastname ||
      !formData.username ||
      !formData.password
    );
  }

  // Handle form submission
  async function handleFormSubmission(e) {
    dispatch(setLoadingState(true));
    e.preventDefault();

    // Validate the form
    if (validateForm()) {
      dispatch(setErrorState("All fields are required"));
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/register`, // Use React environment variable
        formData
      );
      if (response.status === 200) {
        navigate("/login"); // Redirect using React Router
        dispatch(resetLoadingState());
        dispatch(resetErrorState());
      }
    } catch (err) {
      if (err.response) {
        // Server responded with an error
        console.error("Server error:", err.response.data.message);
        dispatch(setErrorState(err.response.data.message));
      } else if (err.request) {
        // Request was made but no response received
        console.error("Network error:", err.request);
        dispatch(setErrorState("Network error. Please try again."));
      } else {
        // Something else caused the error
        console.error("Unexpected error:", err.message);
        dispatch(setErrorState("An unexpected error occurred."));
      }
    } finally {
      dispatch(resetLoadingState());
    }
  }

  return (
    <div className="border-4 border-slate-200 bg-white rounded-lg shadow-lg p-8 max-w-sm lg:max-w-lg mx-auto overflow-hidden">
      <h1 className="text-2xl text-slate-700 text-center font-extrabold mb-6">
        Welcome to Momentum
      </h1>
      {error && (
        <div className="text-center mb-4">
          <span className="text-sm text-red-700">{errorMessage}</span>
        </div>
      )}
      <form className="flex flex-col space-y-4" onSubmit={handleFormSubmission}>
        {/* Firstname Field */}
        <label
          htmlFor="firstname"
          className="text-slate-600 font-medium text-sm"
        >
          Firstname
        </label>
        <input
          type="text"
          onChange={handleChange}
          id="firstname"
          name="firstname"
          className="border border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2 text-sm w-full outline-none"
        />

        {/* Lastname Field */}
        <label
          htmlFor="lastname"
          className="text-slate-600 font-medium text-sm"
        >
          Lastname
        </label>
        <input
          type="text"
          onChange={handleChange}
          id="lastname"
          name="lastname"
          className="border border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2 text-sm w-full outline-none"
        />

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
          className="border border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2 text-sm w-full outline-none"
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
          className="border border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2 text-sm w-full outline-none"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg shadow-lg transition-all w-full"
        >
          {isLoading ? "Working on it..." : "Register"}
        </button>
      </form>

      {/* Alternative Registration */}
      <div className="flex flex-col items-center gap-4 mt-8">
        <div className="flex items-center w-full space-x-2">
          <div className="flex-grow border-t border-slate-300"></div>
          <span className="text-slate-500 text-sm font-medium">OR</span>
          <div className="flex-grow border-t border-slate-300"></div>
        </div>

        <button
          disabled={isLoading}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg shadow-lg transition-all w-full"
        >
          Register with Google
        </button>

        <a
          href="/login"
          className="text-sm text-blue-500 font-semibold underline hover:text-blue-900"
        >
          Already have an account? Sign in.
        </a>
      </div>
    </div>
  );
}

export default Register;
