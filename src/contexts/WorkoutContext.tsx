import { createContext, useReducer } from "react";
import { IWorkout, IAction, IWorkoutsContext } from '../vite-env';


type WorkoutsStateType = {
    workouts: IWorkout[];
};

const initialState = {
    workouts: []
} as WorkoutsStateType;

export const WorkoutsContext = createContext<IWorkoutsContext>({} as IWorkoutsContext);

export const workoutsReducer = (state: WorkoutsStateType, action: IAction) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            };
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            };
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
            };
        default:
            return state;
    }
};

export const WorkoutContextProvider = ({ children }: { children: React.ReactNode; }) => {
    const [state, dispatch] = useReducer(workoutsReducer, initialState);

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    );
};
