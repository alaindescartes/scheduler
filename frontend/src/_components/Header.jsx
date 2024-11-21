import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-slate-800 text-white flex items-center justify-between py-4 px-8 shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 text-2xl font-extrabold">
        <span className="text-blue-400">MOMENTUM</span>
        <FaPlus className="text-blue-400" />
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-6">
        <Link
          to="/homepage"
          className="text-slate-300 hover:text-blue-400 transition duration-200"
        >
          Home
        </Link>
        <Link
          to="#"
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

      {/* User Account Dropdown */}
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="py-2 px-4 rounded-full bg-blue-500 hover:bg-blue-600 transition-all text-white">
              User
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
                className="w-full text-left text-slate-300  hover:text-black transition duration-200"
              >
                About Me
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0 bg-transparent focus:bg-transparent hover:bg-transparent">
              <Button className="w-full text-left text-red-500 hover:bg-red-100 hover:text-black">
                Log Out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;
