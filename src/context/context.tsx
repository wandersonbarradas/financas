import { createContext, ReactNode, useReducer } from "react";
import { ThemeType, ThemeInitialState, reducerTheme } from '../reducers/ThemeReducer'
import { UserInitialState, UserReducer } from '../reducers/UserReducer'
import { GeneralInitialState, GeralReducer } from '../reducers/GeneralReducer'
import { reducerActionType, GeneralType } from '../types/RedeucersTypes'
import { UserType } from "../types/UserType";

type initialStateType = {
    theme: ThemeType;
    user: UserType | null;
    general: GeneralType;
};

type ContextType = {
    state: initialStateType;
    dispatch: (action: reducerActionType) => void;
};

const initialState = {
    theme: ThemeInitialState,
    user: UserInitialState,
    general: GeneralInitialState,
};

export const Context = createContext<ContextType>({
    state: initialState,
    dispatch: (action: reducerActionType) => null
});

const mainReducer = (state: initialStateType, action: reducerActionType) => ({
    theme: reducerTheme(state.theme, action),
    user: UserReducer(state.user, action),
    general: GeralReducer(state.general, action)
})

type ProviderType = {
    children: ReactNode;
};

export const ContextProvider = ({ children }: ProviderType) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);
    const value = { state, dispatch };
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
};

