import { IWorkout } from '../vite-env';

type Props = {
    workout: IWorkout;
};

export default function Workout({ workout }: Props) {
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong> {workout.load.toString()}</p>
            <p><strong>Reps:</strong> {workout.reps.toString()}</p>
            <p>{workout.createdAt}</p>
        </div>
    );
}