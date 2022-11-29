import { GeneralType, reducerActionType } from "../types/RedeucersTypes";

export const GeneralInitialState: GeneralType = {
    selectMonth: true,
};
export const GeralReducer = (state: GeneralType, action: reducerActionType) => {
    switch (action.type) {
        case "setSelectMonth":
            return { ...state, selectMonth: action.payload.selectMonth };
        default:
            return state;
    }
};
