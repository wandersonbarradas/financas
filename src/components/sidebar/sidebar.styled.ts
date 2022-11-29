import { display } from "@mui/system";
import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";
type Props = {
    menu: boolean;
    Theme: ThemeValues;
    modalMore: {
        opacity: number;
        top: number;
    };
};

export const Container = styled.div<Props>`
    background-color: ${(props) => props.Theme.colorComponents};
    padding: 42px 0;
    min-width: ${(props) => (props.menu ? "256px" : "100px")};
    max-width: ${(props) => (props.menu ? "256px" : "100px")};
    transition: all 0.3s ease;
    overflow-x: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
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

    .box-logo {
        width: 100%;
        height: 77px;
        display: flex;
        justify-content: center;

        .LogoClose {
            width: 50%;
        }
    }

    .navigation {
        width: 100%;
        padding: 30px 0;
        margin-top: 43px;

        ul {
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
        }

        .list-navigation {
            gap: 22px;
        }

        .list-options {
            margin-top: 46px;
            padding-top: 22px;
            gap: 22px;
            border-top: 1px solid ${(props) => props.Theme.colorOpacity};
        }
    }

    .logout {
        margin-top: 60px;
        display: flex;
        align-items: center;
        text-decoration: none;
        padding: 15px 0;
        font-weight: 800;
        font-size: 17px;
        line-height: 21px;
        color: #cccbd8;
        transition: all 0.3s ease;
        &:hover {
            color: #4c49ed;
        }

        .box-icon {
            min-width: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .containerModalMore {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: transparent;
        z-index: 50;
        opacity: ${(props) => props.modalMore.opacity};
        transition: all 0.2s ease;

        .modalMore {
            width: 250px;
            position: absolute;
            top: ${(props) => props.modalMore.top}px;
            left: 230px;
            padding: 12px 0;
            background-color: ${(props) => props.Theme.colorComponents};
            box-shadow: 8px 13px 44px -6px rgba(0, 0, 0, 0.5);
            border-radius: 16px;

            ul {
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            li {
                a {
                    display: flex;
                    width: 100%;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 10px;
                    color: ${(props) => props.Theme.colorOpacity};
                    text-decoration: none;
                    padding: 12px 24px;
                    font-weight: 600;
                    transition: all 0.3s ease-in-out;

                    &:hover {
                        background-color: ${(props) =>
                            props.Theme.colorContainer};
                    }

                    .icon {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
        }
    }
`;
