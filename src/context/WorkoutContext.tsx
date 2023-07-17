import { createContext, useReducer } from "react";
import { IWorkout, IAction, IContext } from '../vite-env';


type InitialStateType = {
    workouts: IWorkout[];
};

const initialState = {
    workouts: []
};

export const WorkoutsContext = createContext<IContext | null>(null);

export const workoutsReducer = (state: InitialStateType, action: IAction) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            };
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            };
        default:
            return state;
    }
};

export const WorkoutContextProvider = ({ children }: { children: React.ReactNode; }) => {
    const [state, dispatch] = useReducer(workoutsReducer, initialState);

    return (
        <WorkoutsContext.Provider value={{ state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    );
};
