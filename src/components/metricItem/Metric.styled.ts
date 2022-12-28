import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";
type PropsContainer = {
    Theme: ThemeValues;
};
type Props = {
    background: string;
    color: string;
};

export const Container = styled.div<PropsContainer>`
    background-color: ${(props) => props.Theme.colorComponents};
    padding: 15px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 14px;
    transition: all 0.3s ease;
    border: 1px solid ${(props) => props.Theme.colorBorder};

    .title {
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        color: ${(props) => props.Theme.colorOpacity};
        transition: all 0.3s ease;
    }

    .value {
        font-family: "Inter", sans-serif;
        font-weight: 700;
        font-size: 20px;
        line-height: 28px;
        color: ${(props) => props.Theme.colorTitle};
        transition: all 0.3s ease;

        span {
            font-size: 18px;
            line-height: 23px;
        }
    }
`;

export const Percentagem = styled.div<Props>`
    display: flex;

    div {
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 7px 12px;
        gap: 4px;
        border-radius: 19px;
        background-color: ${(props) => props.background};
        color: ${(props) => props.color};
        transition: all 0.3s ease;
    }
`;
