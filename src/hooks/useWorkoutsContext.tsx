import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext);

    if (!context) throw new Error("useCurrentUser has to be used within <WorkoutsContext.Provider>");

    return context;
};