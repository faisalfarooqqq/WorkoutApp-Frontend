import { useState } from "react"; 
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email,password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:4000/api/user/login', {
                email,
                password
            });

            if (response.status === 201) {
                const { data } = response;

                console.log('Token:', data.token);

                // Save token to local storage
                localStorage.setItem('user', JSON.stringify(data));

                // Update the auth context
                dispatch({ type: 'LOGIN', payload: data });

                setIsLoading(false);
            } 
        } catch (error) {
            setIsLoading(false);
            setError(error.response?.data?.error || 'Something went wrong');
        }
    };

    return { login, isLoading, error };
}
