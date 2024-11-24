import { Outlet } from "react-router-dom"
import Header from "../Header.jsx"
import useAuth from "../../hooks/useAuth.js"

// eslint-disable-next-line react/prop-types
export default function MainOutlet({ children }) {
  useAuth()
  return (
    <>
      <Header />
      {children}
      <Outlet />
    </>
  )
}
