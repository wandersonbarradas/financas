import { reducerActionType } from "../types/RedeucersTypes";

export type ThemeValues = {
    colorContainer: string;
    colorComponents: string;
    colorTitle: string;
    colorOpacity: string;
    colorPrimary: string;
    colorSecundary: string;
};

export const Light: ThemeValues = {
    colorContainer: "#F7F7F7",
    colorComponents: "#FFFFFF",
    colorTitle: "#000000",
    colorOpacity: "#7C7C7C",
    colorPrimary: "#4c49ed",
    colorSecundary: "#AFAEFE",
};

export const Dark: ThemeValues = {
    colorContainer: "#0F0E0E",
    colorComponents: "#232323",
    colorTitle: "#F8F9FA",
    colorOpacity: "#7C7C7C",
    colorPrimary: "#4c49ed",
    colorSecundary: "#AFAEFE",
};

export type ThemeType = {
    status: string;
    theme: ThemeValues;
};

export const ThemeInitialState: ThemeType = {
    status: "Light",
    theme: Light,
};

export const reducerTheme = (state: ThemeType, action: reducerActionType) => {
    switch (action.type) {
        case "setTheme":
            return {
                ...state,
                theme: action.payload.theme,
                status: action.payload.status,
            };
        default:
            return state;
    }
};
