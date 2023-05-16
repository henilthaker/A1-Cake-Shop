import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const userReducer = (state,action)=>{
    switch(action.type){
        case 'LOGIN':
            return({
                user: action.payload
            });
        case 'LOGOUT':
            return({
                user:null
            })
        default:
            return state;
    }
}

export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(userReducer,{
        user:null
    });

    // check if user is already present in local storage
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));

        if(user)
            dispatch({type:'LOGIN', payload:user});
    },[]);

    return(
        <AuthContext.Provider value = {{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}