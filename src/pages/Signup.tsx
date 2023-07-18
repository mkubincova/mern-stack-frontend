import { useState } from 'react';
import { useSignup } from "../hooks/useSingup";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isLoading, error } = useSignup();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await signup(email, password);
    };

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Sing up</h3>

            <label htmlFor="email">Email:</label>
            <input type="email" id='email' onChange={(e) => setEmail(e.target.value)} value={email} />

            <label htmlFor="password">Password:</label>
            <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} value={password} />
            <button type='submit' disabled={isLoading}>Sing up</button>
            {error && <div className='error'>{error}</div>}
        </form>
    );
}