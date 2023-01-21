import { useEffect, useContext } from "react";
import { UserContext } from "../userContext";
import { Navigate } from "react-router-dom";

function Logout() {
    const userContext = useContext(UserContext);
    useEffect(function() {
        // sets user context to null and fetches functions from userController which destroys the session
        const logout = async function() {
            userContext.setUserContext(null);
            const res = await fetch("http://localhost:3001/users/logout");
        }
        logout();
    }, []);

    // redirect to index page
    return (
        <Navigate replace to = "/" />
    );
}

export default Logout;