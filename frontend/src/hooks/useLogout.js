import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
export const useLogout = () => {
    const { dispatch } = useContext(AuthContext);
    const logout = () => {
        //--------------------remove user from local storage--------------------
        localStorage.removeItem('user');

        //----------------------dispatch logout action----------------------
        dispatch({ type: 'LOGOUT' });

        <Navigate to = '/login'/>
    }
    return { logout };
}