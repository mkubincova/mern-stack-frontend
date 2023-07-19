import { useEffect } from 'react';
import Workout from '../components/Workout';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';


export default function Home() {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchWokouts = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/workouts`, {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            });
            const json = await res.json();

            if (res.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json });
            }
        };

        if (user) fetchWokouts();
    }, [dispatch, user]);

    return (
        <div className="home">
            <div className="workouts">
                {workouts.length > 0 && workouts.map((workout) => (
                    <Workout key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
}