import { IWorkout } from '../vite-env';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

type Props = {
    workout: IWorkout;
};

export default function Workout({ workout }: Props) {
    const { dispatch } = useWorkoutsContext();
    const handleClick = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/workouts/${workout._id}`, {
            method: 'DELETE'
        });
        const json = await res.json();

        if (res.ok) dispatch({ type: 'DELETE_WORKOUT', payload: json });
    };

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong> {workout.load.toString()}</p>
            <p><strong>Reps:</strong> {workout.reps.toString()}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span onClick={handleClick} className='material-symbols-outlined'>delete</span>
        </div>
    );
}