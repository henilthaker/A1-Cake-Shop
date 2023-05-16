import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [is_loading, setIsLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);

    const Login = async (email, password) => {
        setError(null);
        setIsLoading(true);

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json();

        if (!response.ok)
            setError(json.error);
        else if (response.ok) {
            dispatch({ type: 'LOGIN', payload: json });
            localStorage.setItem('user', JSON.stringify(json));
            setIsLoading(false);
        }
    }
    return { Login, error, is_loading }
}