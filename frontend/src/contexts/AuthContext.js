import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return ({
                user: action.payload
            });
        case 'LOGOUT':
            return ({
                user: null
            })
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, {
        user: null
    });

    // check if user is already present in local storage
    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));

            if (user) {
                dispatch({ type: 'LOGIN', payload: user });
            }
        } catch (error) {
            // Handle error when parsing or retrieving user from local storage
            console.error('Error retrieving user from local storage:', error);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}