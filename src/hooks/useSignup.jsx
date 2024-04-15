import { useState } from "react"; 
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, username, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:4000/api/user/signup', {
                email,
                username,
                password
            });

            if (response.status === 201) {
                const { data } = response;

                console.log('Token:', data.token);

                // Save token to local storage
                localStorage.setItem('token', JSON.stringify(data));

                // Update the auth context
                dispatch({ type: 'LOGIN', payload: data });

                setIsLoading(false);
            } 
        } catch (error) {
            setIsLoading(false);
            setError(error.response?.data?.error || 'Something went wrong');
        }
    };

    return { signup, isLoading, error };
}
