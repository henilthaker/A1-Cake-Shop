import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [is_loading, setIsLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);

    const Signup = async (name, email, password) => {
        setError(null);
        setIsLoading(true);

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json();

        if (!response.ok)
            setError(json.error);
        else if (response.ok) {
            setError(null);
            dispatch({ type: 'LOGIN', payload: json });
            localStorage.setItem('user', JSON.stringify(json));
            setIsLoading(false);
        }
    }
    return { Signup, error, is_loading }
}