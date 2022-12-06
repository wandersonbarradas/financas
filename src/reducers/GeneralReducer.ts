import { GeneralType, reducerActionType } from "../types/RedeucersTypes";

export const GeneralInitialState: GeneralType = {
    selectMonth: true,
    sideBar: true,
};
export const GeralReducer = (state: GeneralType, action: reducerActionType) => {
    switch (action.type) {
        case "setSelectMonth":
            return { ...state, selectMonth: action.payload.selectMonth };
        case "setSideBar":
            return { ...state, sideBar: action.payload.sideBar };
        default:
            return state;
    }
};
