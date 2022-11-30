import { reducerActionType } from "../types/RedeucersTypes";

export type ThemeValues = {
    colorContainer: string;
    colorComponents: string;
    colorTitle: string;
    colorOpacity: string;
    colorPrimary: string;
    colorSecundary: string;
    colorBorder: string;
    gradientBalance: string;
    colorSideBar: string;
};

export const Light: ThemeValues = {
    colorContainer: "#F7F7F7",
    colorComponents: "#FFFFFF",
    colorTitle: "#000000",
    colorOpacity: "#7C7C7C",
    colorPrimary: "#4c49ed",
    colorSecundary: "#AFAEFE",
    colorBorder: "#D1D1D1",
    gradientBalance: "linear-gradient(180deg, #04B900 -0.38%, #F9F9F9 110.73%)",
    colorSideBar: "#FFFFFF",
};

export const Dark: ThemeValues = {
    colorContainer: "#0F0E0E",
    colorComponents: "#232323",
    colorTitle: "#F8F9FA",
    colorOpacity: "#7C7C7C",
    colorPrimary: "#4c49ed",
    colorSecundary: "#AFAEFE",
    colorBorder: "#3C3C3C",
    gradientBalance: "linear-gradient(180deg, #4FD18B 0%, #232323 100%)",
    colorSideBar: "#000000",
};

export type ThemeType = {
    status: "Dark" | "Light";
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
