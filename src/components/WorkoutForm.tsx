import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

export default function WorkoutForm() {
    const { dispatch } = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const workout = { title, load, reps };

        const res = await fetch(`${import.meta.env.VITE_API_URL}/workouts`, {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await res.json();

        if (!res.ok) setError(json.error);
        if (res.ok) {
            setError(null);
            setTitle('');
            setLoad('');
            setReps('');
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
        }
    };

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label htmlFor="title">Exercise title:</label>
            <input id='title' type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} value={title} />

            <label htmlFor="load">Load (in kg):</label>
            <input id='load' type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoad(e.target.value)} value={load} />

            <label htmlFor="reps">Reps:</label>
            <input id='reps' type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReps(e.target.value)} value={reps} />

            <button type='submit'>Add workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    );
}