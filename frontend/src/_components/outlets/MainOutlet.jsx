import {Outlet} from "react-router-dom";
import Header from "../Header.jsx";

// eslint-disable-next-line react/prop-types
export default function MainOutlet({ children }) {
    return (
        <>
            <Header/>
            {children}
            <Outlet />
        </>
    )
}