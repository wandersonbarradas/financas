import { display } from "@mui/system";
import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";
type Props = {
    menu: boolean;
    Theme: ThemeValues;
    modalMore: {
        top: number;
        left: number;
    };
};

export const Container = styled.div<Props>`
    background-color: ${(props) => props.Theme.colorSideBar};
    width: ${(props) => (props.menu ? "247px" : "88px")};
    transition: all 0.3s ease;
    overflow: hidden;
    border-right: 1px solid ${(props) => props.Theme.colorBorder};

    .sidebar {
        position: fixed;
        z-index: 20;
        top: 0;
        left: 0;
        background-color: ${(props) => props.Theme.colorSideBar};
        padding: 24px 0;
        width: ${(props) => (props.menu ? "247px" : "88px")};
        overflow: visible;
        overflow-y: scroll;
        border-right: 1px solid ${(props) => props.Theme.colorBorder};
        transition: all 0.3s ease;
        height: 100vh;

        &.scroll {
            &::-webkit-scrollbar {
                width: 4px;
                height: 4px;
            }
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

    .boxBtnAdd {
        margin-top: 20px;
        width: 100%;
        display: flex;
        justify-content: center;

        &.mobile {
            display: none;
        }
    }

    .cssbuttons-io-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        font-family: inherit;
        font-weight: 500;
        font-size: 16px;
        padding: 0.7em 1.1em 0.7em 1.1em;
        color: white;
        background-color: #4c49ed;
        background-image: linear-gradient(0deg, #4c49ed 36%, #8383ea 100%);

        border: none;
        box-shadow: 0 0.5em 1.5em -0.5em #4c49ed;
        letter-spacing: 0.05em;
        border-radius: 20em;
        cursor: pointer;
        transition: all 0.15s ease;
    }

    .cssbuttons-io-button:hover {
        box-shadow: 0 0.7em 1.5em -0.5em #4c49ed;
    }

    .cssbuttons-io-button:active {
        box-shadow: 0 0.7em 1.5em -0.5em #4c49ed;
    }

    .navigation {
        width: 100%;
        margin-top: 30px;

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

    .menuAdd {
        z-index: 30;
        margin: 0;
        width: 250px;
        padding: 10px 0;
        border-radius: 12px;
        border: solid 1px ${(props) => props.Theme.colorBorder};
        position: absolute;
        top: 100px;
        left: 20px;
        background-color: ${(props) => props.Theme.colorComponents};
        list-style: none;

        .listItem {
            display: flex;
            align-items: center;
            color: ${(props) => props.Theme.colorOpacity};
            gap: 25px;
            padding: 8px 16px;
            font-size: 15px;
            font-weight: 500;
            transition: all 0.2s ease;
            cursor: pointer;

            &:hover {
                background-color: ${(props) => props.Theme.colorBorder};
            }

            .icon {
                display: flex;
                align-items: center;
                justify-content: center;

                &.des {
                    color: #f02927;
                }

                &.res {
                    color: #4fd18b;
                }

                &.tras {
                    color: #008dff;
                }
            }
        }
    }

    @media screen and (max-width: 992px) {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: auto;
        width: 100%;
        overflow: visible;
        border-right: 0;
        background-color: transparent;

        .sidebar {
            border-radius: 24px 24px 0 0;
            padding: 12px 0;
            position: static;
            width: 100%;
            overflow: visible;
            border-right: 0;
            border-top: 1px solid ${(props) => props.Theme.colorBorder};
            height: auto;

            .box-logo {
                display: none;
            }

            .boxBtnAdd {
                display: none;
            }
            .mobile {
                display: flex;
                margin: 0 auto;

                button {
                }
            }

            .navigation {
                margin: 0;
            }
            .list-navigation {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                padding: 0 24px;
            }
            .list-options {
                flex-direction: row;
                margin-top: 10px;
                display: none;
            }
        }
    }
`;
