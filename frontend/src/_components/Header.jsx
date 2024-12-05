import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios"
import { useState } from "react"
import { FaBars, FaPlus } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { logout } from "../store/user/userSlice"
import { useDispatch } from "react-redux"
import { persistor } from "../store/store"
import { useSelector } from "react-redux"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user?.user?.details) || {
    firstname: "",
    lastname: "",
  }

  /**
   * API that handles user logout.
   *
   * Sends a POST request to the logout endpoint. If successful, navigates the user to the login page
   * and displays a success message. If an error occurs, it logs the error and displays a failure message.
   *
   * @async
   * @function handleLogout
   * @returns {Promise<void>} - Resolves when logout completes.
   */
  async function handleLogout() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/logout`,
        { withCredentials: true }
      )
      if (response.status === 200) {
        dispatch(logout())
        await persistor.purge()
        navigate("/login")
        toast("logged out successfully", {
          style: { background: "green", color: "white" },
        })
      }
    } catch (error) {
      toast("There was a problem while logging out, try again!", {
        style: { background: "red", color: "white" },
      })
      console.log("error during logout: ", error)
    }
  }

  return (
    <header className="bg-slate-800 text-white flex items-center justify-between py-4 px-6 md:px-8 shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center space-x-1 text-xl md:text-2xl font-extrabold">
        <span className="text-blue-400">MOMENTUM</span>
        <FaPlus className="text-blue-400" />
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden flex items-center space-x-4">
        <Button
          className="text-white hover:text-blue-400"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <FaBars />
        </Button>
        {/* User Account Dropdown for Mobile */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="py-2 px-4 rounded-full bg-blue-500 hover:bg-blue-600 transition-all text-white">
              {`${user?.firstname[0].toUpperCase()}${user?.lastname[0].toUpperCase()}`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-700 text-slate-300 rounded-lg shadow-lg">
            <DropdownMenuLabel className="text-slate-400">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-600" />
            <DropdownMenuItem>
              <Link
                to="#"
                className="w-full text-left text-slate-300 hover:text-black transition duration-200"
              >
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to="#"
                className="w-full text-left text-slate-300 hover:text-black transition duration-200"
              >
                Notifications
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to="#"
                className="w-full text-left text-slate-300 hover:text-black transition duration-200"
              >
                About Me
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0 bg-transparent focus:bg-transparent hover:bg-transparent">
              <Button
                onClick={handleLogout}
                className="w-full text-left text-red-500 hover:bg-red-100 hover:text-black"
              >
                Log Out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation Links */}
      <nav
        className={`absolute md:relative top-16 left-0 w-full md:w-auto md:top-auto md:left-auto bg-slate-800 md:bg-transparent flex flex-col md:flex-row md:space-x-6 items-start md:items-center space-y-2 md:space-y-0 p-6 md:p-0 transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Link
          to="/homepage"
          className="text-slate-300 hover:text-blue-400 transition duration-200"
        >
          Home
        </Link>
        <Link
          to="/homepage/residence"
          className="text-slate-300 hover:text-blue-400 transition duration-200"
        >
          Residences
        </Link>
        <Link
          to="#"
          className="text-slate-300 hover:text-blue-400 transition duration-200"
        >
          Resources
        </Link>
        <Link
          to="#"
          className="text-slate-300 hover:text-blue-400 transition duration-200"
        >
          Timesheets
        </Link>
        <Link
          to="#"
          className="text-slate-300 hover:text-blue-400 transition duration-200"
        >
          Schedule
        </Link>
      </nav>

      {/* User Account Dropdown for Desktop */}
      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="py-2 px-4 rounded-full bg-blue-500 hover:bg-blue-600 transition-all text-white">
              {`${user?.firstname?.[0]?.toUpperCase() || ""}${
                user?.lastname?.[0]?.toUpperCase() || ""
              }`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-700 text-slate-300 rounded-lg shadow-lg">
            <DropdownMenuLabel className="text-slate-400">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-600" />
            <DropdownMenuItem>
              <Link
                to="#"
                className="w-full text-left text-slate-300 hover:text-black transition duration-200"
              >
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to="#"
                className="w-full text-left text-slate-300 hover:text-black transition duration-200"
              >
                Notifications
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to="#"
                className="w-full text-left text-slate-300 hover:text-black transition duration-200"
              >
                About Me
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0 bg-transparent focus:bg-transparent hover:bg-transparent">
              <Button
                className="w-full text-left text-red-500 hover:bg-red-100 hover:text-black"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header
