import { ThemeValues } from "./../../reducers/ThemeReducer";
import styled from "styled-components";

type Props = {
    Theme: ThemeValues;
    bg: string;
};

export const Container = styled.div<Props>`
    background-color: ${(props) => props.bg};
    position: absolute;
    right: -320px;
    bottom: 100px;
    width: 300px;
    padding: 10px 20px;
    border-radius: 12px;
    border: 1px solid ${(props) => props.Theme.colorBorder};
    transition: all 0.4s ease-in-out;
    position: fixed;
    overflow: hidden;

    &::after {
        position: absolute;
        content: "";
        left: 0;
        right: 0;
        bottom: 0px;
        height: 3px;
        width: 0;
        background-color: ${(props) => props.Theme.colorPrimary};
        transition: all 4s ease-in-out;
    }

    &.active {
        right: 20px;

        &::after {
            width: 300px;
        }
    }

    p {
        margin: 0;
        color: #fff;
        font-weight: 500;
        font-size: 14px;
    }
`;
