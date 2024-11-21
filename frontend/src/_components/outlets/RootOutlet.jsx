import {Outlet} from "react-router-dom";

// eslint-disable-next-line react/prop-types
function RootOutlet({ children }) {
    return (
        <>
            {children}
            <Outlet />
        </>
    )
}

export default RootOutlet;