import { useEffect, useState } from 'react';
import { IWorkout } from '../vite-env';
import Workout from '../components/Workout';

export default function Home() {
    const [workouts, setWorkouts] = useState<IWorkout[]>([]);

    useEffect(() => {
        const fetchWokouts = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/workouts`);
            const json = await res.json();

            if (res.ok) {
                setWorkouts(json);
            }
        };

        fetchWokouts();
    }, []);

    return (
        <div className="home">
            <div className="workouts">
                {workouts.length > 0 && workouts.map((workout) => (
                    <Workout key={workout._id} workout={workout} />
                ))}
            </div>
        </div>
    );
}