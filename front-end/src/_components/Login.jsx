import Link from "next/link";

function Login() {
  return (
    <div className="border-4 border-slate-200 bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
      <h1 className="text-2xl text-slate-700 text-center font-extrabold mb-6">
        Welcome to Momentum
      </h1>
      <form className="flex flex-col space-y-4">
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
          id="password"
          name="password"
          className="border border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2 text-sm outline-none"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg shadow-lg transition-all"
        >
          Login
        </button>
      </form>
      {/* other forms of login in */}
      <div className="flex flex-col gap-6 justify-center">
        <div className="flex items-center space-x-2 mt-12">
          <div className="flex-grow border-t border-slate-300"></div>
          <span className="text-slate-500 text-sm font-medium">OR</span>
          <div className="flex-grow border-t border-slate-300"></div>
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg shadow-lg transition-all">
          LOGIN WITH GOOGLE
        </button>
        <Link
          href="#"
          className="text-sm text-blue-500 font-semibold underline hover:text-blue-900"
        >
          Forget your password?
        </Link>
        <Link
          href="#"
          className="text-sm text-blue-500 font-semibold underline hover:text-blue-900"
        >
          Not registered?, Sign up.
        </Link>
      </div>
    </div>
  );
}

export default Login;
