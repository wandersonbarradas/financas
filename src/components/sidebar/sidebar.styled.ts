import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";
type Props = {
    menu: boolean;
    Theme: ThemeValues;
    modalMore: {
        opacity: number;
        top: number;
        left: number;
    };
};

export const Container = styled.div<Props>`
    background-color: ${(props) => props.Theme.colorSideBar};
    padding: 24px 0;
    width: ${(props) => (props.menu ? "247px" : "88px")};
    transition: all 0.3s ease;
    overflow-x: hidden;
    overflow-y: scroll;
    border-right: 1px solid ${(props) => props.Theme.colorBorder};

    &.scroll {
        &::-webkit-scrollbar {
            width: 4px;
            height: 4px;
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
        margin-top: 45px;

        ul {
            margin: 0;
            padding: 0 16px;
            display: flex;
            flex-direction: column;
        }

        .list-navigation {
            gap: 20px;
        }

        .list-options {
            margin-top: 56px;
            padding-top: 16px;
            gap: 16px;
            border-top: 1px solid ${(props) => props.Theme.colorBorder};
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
            left: ${(props) => props.modalMore.left}px;
            padding: 12px 0;
            background-color: ${(props) => props.Theme.colorComponents};
            box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
                0px 8px 10px 1px rgb(0 0 0 / 14%),
                0px 3px 14px 2px rgb(0 0 0 / 12%);
            border-radius: 16px;
            border: 1px solid ${(props) => props.Theme.colorBorder};

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
                    font-weight: 500;
                    transition: all 0.3s ease-in-out;

                    &:hover {
                        background-color: ${(props) => props.Theme.colorBorder};
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
