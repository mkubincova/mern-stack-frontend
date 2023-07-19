import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext();

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
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

    return { login, isLoading, error };
};