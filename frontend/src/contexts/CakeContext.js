import { createContext, useReducer } from 'react';

export const CakeContext = createContext();

const cakeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CAKE':
            return({
                cakes: action.payload
            });
        case 'ADD_CAKE':
            return({
                cakes:[action.payload, ...state]
            });
        case 'DELETE_CAKE':
            // {
            //     const updated_cakes = state.cakes.filter(cake=>{
            //         return cake._id != action.payload._id;
            //     })
            //     return({
            //         cakes:updated_cakes
            //     });
            // }

            // OR
            return({
                cakes: state.cakes.filter(cake=>(
                    cake._id != action.payload._id
                ))
            });
        default:
            return state;
    }
}

export const CakeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cakeReducer, {
        cakes: null
    })
    return (
        <CakeContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CakeContext.Provider>
    )
}