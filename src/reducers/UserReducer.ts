import { UserType } from "../types/UserType";
import { reducerActionType } from "../types/RedeucersTypes";

export const UserInitialState: UserType = {
    data: null,
    categories: null,
    subcategories: null,
    transactions: [],
    selectedDate: new Date(),
};

export const UserReducer = (state: UserType, action: reducerActionType) => {
    switch (action.type) {
        case "setData":
            return { ...state, data: action.payload.data };
        case "setCategories":
            return { ...state, categories: action.payload.categories };
        case "setSubCategories":
            return { ...state, subcategories: action.payload.subcategories };
        case "setTransactions":
            return { ...state, transactions: action.payload.transactions };
        case "setSelectedDate":
            return { ...state, selectedDate: action.payload.selectedDate };
        default:
            return state;
    }
};
