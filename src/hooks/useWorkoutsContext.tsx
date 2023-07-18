import { WorkoutsContext } from "../contexts/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext);

    if (!context) throw new Error("useWorkoutsContext has to be used within <WorkoutsContext.Provider>");

    return context;
};