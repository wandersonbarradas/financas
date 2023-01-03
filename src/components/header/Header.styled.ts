import { display } from "@mui/system";
import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";
type Props = {
    Theme: ThemeValues;
    dropdown: boolean;
    selectMonth: boolean;
};

export const Container = styled.header<Props>`
    width: 100%;
    padding: 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${(props) => props.Theme.colorSideBar};
    border-bottom: 1px solid ${(props) => props.Theme.colorBorder};
    position: relative;
    z-index: 2;

    .boxSelectMonth {
        position: absolute;
        left: 50%;
        margin-left: -65px;
        width: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        height: auto;

        .selectMonth {
            width: 100%;
            border: solid 1px ${(props) => props.Theme.colorOpacity};
            padding: 5px 15px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${(props) => props.Theme.colorTitle};
            cursor: pointer;

            &:hover {
                background-color: ${(props) => props.Theme.colorBorder};
                transition: all 0.3s ease;
            }

            span {
                text-align: end;
                font-size: 0.875rem;
            }

            .icon {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }

    /* .leftSide,
    .rightSide {
        z-index: 10;
        flex: 1;
        display: flex;
        align-items: center;
    } */

    /* .leftSide {
    } */

    .box-logo {
        flex: 1;
        display: none;
        width: 50px;
        justify-content: flex-start;
        align-items: center;

        .LogoClose {
            width: 50px;
        }
    }

    .infoUser {
        flex: 1;
    }

    .infoNameUser {
        display: block;
        font-size: 1.25rem;
        color: ${(props) => props.Theme.colorTitle};
        font-weight: 600;
        margin-bottom: 5px;
    }
    .infoDate {
        display: block;
        font-size: 14px;
        color: ${(props) => props.Theme.colorOpacity};
        font-weight: 500;
    }

    .boxToggleMenu {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .toggleMenu {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            cursor: pointer;
            padding: 6px;
            transition: all 0.3s ease;

            &:hover {
                background-color: ${(props) => props.Theme.colorBorder};
            }

            img {
                width: 100%;
                border-radius: 50%;
            }
        }
    }

    /* .rightSide {
        justify-content: flex-end;
    } */

    .dropdown {
        width: 250px;
        position: absolute;
        overflow: hidden;
        transition: all 0.8s ease-in-out;
        top: ${(props) => (props.dropdown ? "90px" : "-250px")};
        right: ${(props) => (props.dropdown ? "24px" : "-250px")};
        padding: 12px 0px;
        background-color: ${(props) => props.Theme.colorComponents};
        box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
            0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
        border-radius: 16px;
        border: 1px solid ${(props) => props.Theme.colorBorder};
        z-index: 1;

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

    .containerCalendar {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: transparent;
        z-index: 50;
    }

    @media screen and (max-width: 840px) {
        .infoUser {
            display: none;
        }

        .box-logo {
            display: flex;
        }
    }
    @media screen and (max-width: 576px) {
        .box-logo {
            .LogoClose {
                width: 32px;
                height: 32px;
            }
        }
        .boxSelectMonth {
            .selectMonth {
                border: 0;
                padding: 5px 10px;

                .icon {
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
        .boxToggleMenu {
            .toggleMenu {
                width: 44px;
                height: 44px;
                padding: 4px;
            }
        }

        .dropdown {
            width: auto;
            transition: all 0.8s ease-in-out;
            top: ${(props) => (props.dropdown ? "75px" : "-250px")};
            right: ${(props) => (props.dropdown ? "24px" : "-250px")};
        }
    }
`;
