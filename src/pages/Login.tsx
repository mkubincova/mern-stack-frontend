import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(email);
    };

    return (
        <form className='login' onSubmit={handleSubmit}>
            <h3>Login</h3>

            <label htmlFor="email">Email:</label>
            <input type="email" id='email' onChange={(e) => setEmail(e.target.value)} value={email} />

            <label htmlFor="password">Password:</label>
            <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} value={password} />
            <button type='submit'>Login</button>
        </form>
    );
}