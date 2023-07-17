import { useEffect } from 'react';
import Workout from '../components/Workout';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';


export default function Home() {
    const { state, dispatch } = useWorkoutsContext();

    useEffect(() => {
        const fetchWokouts = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/workouts`);
            const json = await res.json();

            if (res.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json });
            }
        };

        fetchWokouts();
    }, [dispatch]);

    return (
        <div className="home">
            <div className="workouts">
                {state.workouts.length > 0 && state.workouts.map((workout) => (
                    <Workout key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
}