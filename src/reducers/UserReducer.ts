import { UserType } from "../types/UserType";
import { reducerActionType } from "../types/RedeucersTypes";

export const UserInitialState: UserType | null = null;

export const UserReducer = (
    state: UserType | null,
    action: reducerActionType,
) => {
    switch (action.type) {
        case "setUser":
            return (state = action.payload.user);
        default:
            return state;
    }
};
