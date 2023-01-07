import { SideBar } from "./sidebar";
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
    z-index: 20;

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
                    color: ${(props) => props.Theme.expenseColor};
                }

                &.res {
                    color: ${(props) => props.Theme.incomeColor};
                }

                &.tras {
                    color: ${(props) => props.Theme.transferColor};
                }
            }
        }
    }

    .boxModalTransaction {
        height: auto;
        width: 100%;
        max-width: 430px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${(props) => props.Theme.colorSideBar};

        .headerBox {
            display: none;
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
        z-index: 10;

        .sidebar {
            border-radius: 24px 24px 0 0;
            padding: 6px 0;
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
                width: 20px;
                display: flex;
                margin: 0 auto;

                .cssbuttons-io-button {
                    margin-top: -5px;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    transform: scale(3.5);
                    padding: 0;

                    svg {
                        font-size: 1rem;
                        transform: scale(0.8);
                    }
                }

                .cssbuttons-io-button:hover {
                    box-shadow: 0 0.7em 1.5em -0.5em #4c49ed;
                }

                .cssbuttons-io-button:active {
                    box-shadow: 0 0.7em 1.5em -0.5em #4c49ed;
                }

                span {
                    display: none;
                }
            }

            .navigation {
                margin: 0;
            }
            .list-navigation {
                flex-direction: row;
                justify-content: center;
                padding: 0 12px;
            }
            .list-options {
                flex-direction: row;
                margin-top: 10px;
                display: none;
            }
        }
        .containerModalAdd {
            width: 100%;
            position: absolute;
            bottom: 150px;

            .row {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 100px;

                .itemAdd {
                    background-color: transparent;
                    border: 0;
                    outline: 0;
                    width: 100px;
                    display: grid;
                    place-items: center;
                    gap: 5px;
                    color: ${(i) => i.Theme.colorTitle};
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: "Poppins", sans-serif;
                    font-size: 14px;

                    &:hover {
                        .icon {
                            background-color: ${(i) => i.Theme.colorBorder};
                            transition: all 0.3s ease;
                        }
                    }

                    .icon {
                        width: 50px;
                        height: 50px;
                        background-color: ${(i) => i.Theme.colorComponents};
                        border-radius: 50%;
                        display: grid;
                        place-items: center;

                        &.des {
                            color: ${(props) => props.Theme.expenseColor};
                        }

                        &.res {
                            color: ${(props) => props.Theme.incomeColor};
                        }

                        &.tras {
                            color: ${(props) => props.Theme.transferColor};
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 576px) {
        .boxModalTransaction {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            height: 100vh;
            max-width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: start;
            background-color: ${(props) => props.Theme.colorSideBar};

            .headerBox {
                padding: 20px 20px 40px 20px;
                display: flex;
                align-items: center;

                .titleTransaction {
                    margin: 0;
                    font-size: 20px;
                    font-weight: 500;
                    color: ${(i) => i.Theme.colorTitle};
                }

                .icon {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: ${(i) => i.Theme.colorTitle};
                    margin-right: 15px;
                }
            }
        }
    }
    @media screen and (max-width: 460px) {
        .list-navigation {
            padding: 0 8px;
        }

        .sidebar {
            .mobile {
                .cssbuttons-io-button {
                    margin-top: -10px;
                    transform: scale(3.1);
                }
            }
        }
    }
`;
