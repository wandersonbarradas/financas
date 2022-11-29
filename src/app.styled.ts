import styled from "styled-components";
import { ThemeValues } from "./reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
};

export const Container = styled.div<Props>`
    width: 100%;
    background-color: ${(props) => props.Theme.colorContainer};
    display: flex;
    max-height: 100vh;
    overflow: hidden;
    transition: all 0.3s ease;

    .btn-switch-theme {
        position: absolute;
        top: 20px;
        right: 20px;
    }

    .main {
        flex: 1;
        padding: 0 24px 36px 36px;
        max-height: 100%;
        overflow-y: scroll;

        &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            opacity: 0;
        }

        &::-webkit-scrollbar-thumb {
            background-color: transparent;
            border-radius: 5px;
            transition: all 0.3s ease;
        }

        &:hover {
            &::-webkit-scrollbar-thumb {
                background-color: ${(props) => props.Theme.colorOpacity};
                border-radius: 5px;
            }
        }
    }

    .container-modal-transactions {
        width: 100%;
        height: 100vh;
        max-height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const Loader = styled.div;
