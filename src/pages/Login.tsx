import { useState } from 'react';
import { useLogin } from "../hooks/useLogin";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await login(email, password);
    };

    return (
        <form className='login' onSubmit={handleSubmit}>
            <h3>Login</h3>

            <label htmlFor="email">Email:</label>
            <input type="email" id='email' onChange={(e) => setEmail(e.target.value)} value={email} />

            <label htmlFor="password">Password:</label>
            <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} value={password} />
            <button type='submit' disabled={isLoading}>Login</button>
            {error && <div className='error'>{error}</div>}
        </form>
    );
}