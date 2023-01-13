import { display } from "@mui/system";
import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";
type Props = {
    menu: boolean;
    Theme: ThemeValues;
    modalMore: {
        top: number;
        left: number;
        active: boolean;
    };
    modalAddMobile: boolean;
};

export const Container = styled.div<Props>`
    background-color: ${(props) => props.Theme.colorSideBar};
    width: ${(props) => (props.menu ? "247px" : "88px")};
    transition: all 0.3s ease;
    border-right: 1px solid ${(props) => props.Theme.colorBorder};
    z-index: 20;
    position: relative;

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

        .boxSwitchMenu {
            width: 100%;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;

            .iconSwitchMenu {
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
                color: ${(i) => i.Theme.colorOpacity};
                svg {
                    font-size: 2rem;
                    transform: rotate(${(i) => (i.menu ? 0 : "180")}deg);
                }
                &:hover {
                    background-color: ${(i) => i.Theme.colorBorder};
                }
            }
        }
    }

    .box-logo {
        width: 100%;
        height: ${(i) => (i.menu ? 77 : 42)}px;
        display: flex;
        justify-content: center;
        margin-bottom: ${(i) => (i.menu ? 0 : 20)}px;
        margin-top: ${(i) => (i.menu ? 0 : 18)}px;
        .logo {
            width: 156px;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 100%;
            }

            &.close {
                width: 50%;
            }
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
        transition: all 0.3s ease;
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

    .modalMore {
        width: 250px;
        position: absolute;
        top: ${(props) => props.modalMore.top}px;
        left: ${(props) => props.modalMore.left}px;
        padding: 12px 0;
        background-color: ${(props) => props.Theme.colorComponents};
        box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
            0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
        border-radius: 16px;
        border: 1px solid ${(props) => props.Theme.colorBorder};

        .headerModalMore {
            display: none;
        }

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

            &.moreInvoice,
            &.moreReport,
            &.moreSettings,
            &.moreHelp,
            &.moreLogOut {
                display: none;
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

    .containerModalAdd {
        display: none;
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
                    transform: ${(i) =>
                        i.modalAddMobile
                            ? "scale(3.5) rotate(45deg)"
                            : "scale(3.5)"};
                    z-index: ${(i) => (i.modalAddMobile ? 1001 : 1)};
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
            display: block;
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
                    color: #fff;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: "Poppins", sans-serif;
                    font-size: 12px;

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
        .modalMore {
            width: 400px;
            height: 100vh;
            position: fixed;
            top: 0;
            left: auto;
            right: ${(i) => (i.modalMore.active ? "0" : "-400")}px;
            bottom: 0;
            border-radius: 0px;
            transition: all 1s ease;

            .headerModalMore {
                display: block;
                padding: 0 12px;

                .icon {
                    display: inline-flex;
                    justify-content: flex-start;
                    align-items: center;
                    color: ${(i) => i.Theme.colorOpacity};
                    cursor: pointer;
                    svg {
                        font-size: 2rem;
                    }
                }
            }
            ul {
                gap: 0;
                margin-top: 30px;
            }

            li {
                padding: 0 12px;
                transition: all 0.3s ease-in-out;

                &:hover {
                    background-color: ${(i) => i.Theme.colorBorder};
                }
                a {
                    width: auto;
                    gap: 20px;
                    color: ${(props) => props.Theme.colorOpacity};
                    padding: 20px 0;
                    font-weight: 400;
                    border-bottom: 1px solid ${(i) => i.Theme.colorBorder};

                    &:hover {
                        background-color: transparent;
                    }
                }

                &.moreSettings,
                &.moreHelp,
                &.moreLogOut {
                    display: block;
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
                padding: 20px 20px 80px 20px;
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

        .modalMore {
            width: 100%;

            li {
                &.moreInvoice,
                &.moreReport {
                    display: block;
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
                    transform: ${(i) =>
                        i.modalAddMobile
                            ? "scale(3.1) rotate(45deg)"
                            : "scale(3.1)"};
                }
            }
        }
    }
`;
