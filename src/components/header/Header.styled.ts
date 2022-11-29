import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";
type Props = {
    Theme: ThemeValues;
    dropdown: boolean;
};

export const Container = styled.header<Props>`
    width: 100%;
    padding: 25px 0 60px 0;
    display: flex;
    align-items: center;

    .rightSide,
    .leftSide {
        flex: 1;
    }

    .leftSide {
        display: flex;
        justify-content: flex-end;

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

    .rightSide {
        display: flex;
        justify-content: flex-end;

        .perfilCard {
            cursor: pointer;
            width: 250px;
            height: 55px;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 30px;
            transition: all 0.3s ease;

            &:hover {
                background-color: ${(props) => props.Theme.colorComponents};
            }

            .perfilPhoto {
                width: 40px;
                height: 40px;
                min-width: 40px;
                min-height: 40px;
                margin-right: 15px;
                img {
                    width: 100%;
                    border-radius: 50%;
                }
            }

            .perfilName {
                color: ${(props) => props.Theme.colorTitle};
                font-weight: 700;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-right: 10px;
            }
            .perfilIcon {
                width: 26px;
                height: 26px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: ${(props) => props.Theme.colorTitle};
                border-radius: 50%;
                border: solid 1px ${(props) => props.Theme.colorTitle};
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
            top: 95px;
            right: 30px;
            padding: ${(props) => (props.dropdown ? "12px 0px" : "0px")};
            background-color: ${(props) => props.Theme.colorComponents};
            box-shadow: 8px 13px 44px -6px rgba(0, 0, 0, 0.5);
            border-radius: 16px;
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
