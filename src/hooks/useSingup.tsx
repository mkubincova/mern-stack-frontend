import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useSignup = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext();

    const signup = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const json = await res.json();

        if (!res.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (res.ok) {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // update auth context
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};