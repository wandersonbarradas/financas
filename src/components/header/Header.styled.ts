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
    height: 96px;
    padding: 0 24px 0 36px;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.Theme.colorSideBar};
    border-bottom: 1px solid ${(props) => props.Theme.colorBorder};

    .leftSide {
        width: 42%;
        display: flex;
        align-items: center;

        .InfoNameUser {
            display: block;
            font-size: 20px;
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
    }

    .toogleMenu {
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

    .rightSide {
        flex: 1;
        display: flex;
        justify-content: ${(props) =>
            props.selectMonth ? "space-between" : "flex-end"};
        align-items: center;
        .selectMonth {
            width: 175px;
            border: solid 1px ${(props) => props.Theme.colorOpacity};
            padding: 5px 15px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            color: ${(props) => props.Theme.colorTitle};
            cursor: pointer;

            &:hover {
                background-color: ${(props) => props.Theme.colorBorder};
                transition: all 0.3s ease;
            }

            span {
                flex: 1;
                width: 80px;
                text-align: center;
                font-size: 14px;
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

    .containerMenuDropDown {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: transparent;
        z-index: 50;

        .dropdown {
            width: 250px;
            position: absolute;
            overflow: hidden;
            transition: all 0.1s ease-out;
            top: 105px;
            right: 30px;
            padding: ${(props) => (props.dropdown ? "12px 0px" : "0px")};
            background-color: ${(props) => props.Theme.colorComponents};
            box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
                0px 8px 10px 1px rgb(0 0 0 / 14%),
                0px 3px 14px 2px rgb(0 0 0 / 12%);
            border-radius: 16px;
            border: 1px solid ${(props) => props.Theme.colorBorder};
            height: ${(props) => (props.dropdown ? "auto" : "0px")};

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

    .containerCalendar {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: transparent;
        z-index: 50;
    }
`;
