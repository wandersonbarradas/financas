import styled from "styled-components";
import { ThemeValues } from "./reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
};

export const Container = styled.div<Props>`
    width: 100%;
    background-color: ${(props) => props.Theme.colorContainer};
    display: flex;
    min-height: 100vh;
    overflow: hidden;
    transition: all 0.3s ease;

    .main {
        flex: 1;
        padding: 0;
        overflow-x: hidden;
        overflow-y: scroll;
        max-height: 100vh;
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

    .scroll {
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
    @media screen and (max-width: 992px) {
        flex-direction: column-reverse;

        .main {
            padding-bottom: 60px;
        }
    }
    @media screen and (max-width: 780px) {
        .scroll {
            &::-webkit-scrollbar {
                width: 0;
                height: 0;
            }
            s &:hover {
                &::-webkit-scrollbar-thumb {
                    background-color: transparent;
                }
            }
        }
    }

    //Utilitários

    .iconMore {
        padding: 0.5rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${(p) => p.Theme.colorOpacity};
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
            background-color: ${(p) => p.Theme.colorBorder};
        }
    }
`;

export const Loader = styled.div;
