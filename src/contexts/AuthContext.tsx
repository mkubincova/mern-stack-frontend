import { createContext, useEffect, useReducer } from "react";
import { IUser, IAction, IUserContext } from '../vite-env';


type UserStateType = {
    user: IUser | null;
};

const initialState = {
    user: null,
} as UserStateType;


export const AuthContext = createContext<IUserContext>({} as IUserContext);

export const authReducer = (state: UserStateType, action: IAction) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }: { children: React.ReactNode; }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const user = localStorage.getItem('user');

        if (user) {
            dispatch({ type: 'LOGIN', payload: JSON.stringify(user) });
        }
    }, []);

    console.log('AuthContext state: ', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
