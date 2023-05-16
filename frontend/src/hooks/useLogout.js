import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
export const useLogout = () => {
    const { dispatch } = useContext(AuthContext);
    const logout = () => {
        //--------------------remove user from local storage--------------------
        localStorage.removeItem('user');

        //----------------------dispatch logout action----------------------
        dispatch({ type: 'LOGOUT' });
    }
    return { logout };
}