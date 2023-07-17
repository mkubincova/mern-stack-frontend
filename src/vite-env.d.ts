/// <reference types="vite/client" />

export interface IWorkout {
    _id: Key;
    title: String;
    reps: Number;
    load: Number;
    createdAt: Date;
    updatedAt: Date;
    __v: Number;
}

export interface IAction {
    readonly type: string;
    readonly payload?: any;
}

export interface IWorkoutsContext {
    workouts: IWorkout[];
    dispatch: React.Dispatch<IAction>;
}