import Link from "next/link";

function Register() {
  return (
    <div className="border-4 border-slate-200 bg-white rounded-lg shadow-lg p-8 max-w-sm lg:max-w-lg mx-auto overflow-hidden">
      <h1 className="text-2xl text-slate-700 text-center font-extrabold mb-6">
        Welcome to Momentum
      </h1>
      <form className="flex flex-col space-y-4">
        {/* Firstname Field */}
        <label
          htmlFor="firstname"
          className="text-slate-600 font-medium text-sm"
        >
          Firstname
        </label>
        <input
          type="text"
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
          id="password"
          name="password"
          className="border border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2 text-sm w-full outline-none"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg shadow-lg transition-all w-full"
        >
          Register
        </button>
      </form>

      {/* Alternative Registration */}
      <div className="flex flex-col items-center gap-4 mt-8">
        <div className="flex items-center w-full space-x-2">
          <div className="flex-grow border-t border-slate-300"></div>
          <span className="text-slate-500 text-sm font-medium">OR</span>
          <div className="flex-grow border-t border-slate-300"></div>
        </div>

        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg shadow-lg transition-all w-full">
          Register with Google
        </button>

        <Link
          href="/"
          className="text-sm text-blue-500 font-semibold underline hover:text-blue-900"
        >
          Already have an account? Sign in.
        </Link>
      </div>
    </div>
  );
}

export default Register;
