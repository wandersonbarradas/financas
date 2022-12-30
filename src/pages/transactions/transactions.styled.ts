import { display } from "@mui/system";
import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
    inputSearch: boolean;
    colorType: string;
    position: { left: number; top: number };
};

export const Container = styled.div<Props>`
    padding: 0 24px 0 36px;
    overflow-x: hidden;
    max-width: 1440px;
    margin: 0 auto;

    .header {
        width: 100%;
        padding: 50px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .leftSide,
        .rightSide {
            flex: 1;
        }

        .leftSide {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .type {
                background-color: ${(props) => props.colorType};
                color: #ffffff;
                height: 48px;
                padding: 15px;
                font-weight: 500;
                border-radius: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                gap: 5px;
                transition: all 0.3s ease;

                &:hover {
                }
            }
        }
        .rightSide {
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
        .boxOptions {
            display: flex;
            gap: 12px;
            align-items: center;

            .btn {
                border-radius: 50%;
                width: 48px;
                height: 48px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: ${(props) => props.Theme.colorComponents};
                border: 1px solid ${(props) => props.Theme.colorBorder};
                outline: 0;
                color: ${(props) => props.Theme.colorOpacity};
                transition: all 0.3s ease;
                cursor: pointer;

                &:hover {
                    background-color: ${(props) => props.Theme.colorBorder};
                }

                &.btn-search {
                    width: ${(props) => (props.inputSearch ? 300 : 48)}px;
                    border-radius: 48px;
                    padding: 10px;
                    position: relative;
                    overflow: hidden;

                    input {
                        position: absolute;
                        left: ${(props) =>
                            props.inputSearch ? "10px" : "50px"};
                        display: block;
                        width: 250px;
                        background-color: transparent;
                        border: 0;
                        outline: 0;
                        height: 100%;
                        color: ${(props) => props.Theme.colorTitle};
                        font-size: 16px;
                        opacity: ${(props) => (props.inputSearch ? "1" : "0")};
                        transition: all 0.3s ease;
                        transition: opacity 0.5s ease-in-out;
                    }

                    svg {
                        background-color: inherit;
                        position: absolute;
                        right: 10px;
                    }
                }
            }
        }
    }

    .body {
        width: 100%;
        background-color: ${(props) => props.Theme.colorComponents};
        border-radius: 12px;
        overflow-x: hidden;
        border: 1px solid ${(props) => props.Theme.colorBorder};
        box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
            0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
        margin-bottom: 20px;

        .tableTransactions {
            width: 100%;
            border-spacing: 0;
            padding-bottom: 20px;
            transition: all 0.3s ease;
        }

        thead {
            background-color: ${(props) => props.Theme.colorBorder};
        }

        tr {
            .done {
                max-width: 10%;
                max-width: 10px;
            }
            .date {
                width: 10%;
                max-width: 10px;
            }
            .description {
                width: 19%;
                max-width: 10px;
            }
            .category {
                width: 19%;
                max-width: 10px;
            }
            .account {
                width: 19%;
                max-width: 10px;
            }
            .value {
                width: 12%;
                max-width: 10px;
            }
            .actionArea {
                width: 10%;
                max-width: 10px;
            }
            transition: all 0.3s ease;
        }

        th {
            padding: 15px;
            text-align: start;
            color: ${(props) => props.Theme.colorTitle};
            border-bottom: 1px solid ${(props) => props.Theme.colorBorder};
            font-weight: 400;
            font-size: 14px;
            &:last-child {
                padding-right: 20px;
            }
            &:first-child {
                padding-left: 20px;
            }
            transition: all 0.3s ease;
        }
    }

    .containerToggle {
        position: absolute;
        top: ${(props) => props.position.top}px;
        left: ${(props) => props.position.left}px;
        background-color: ${(props) => props.Theme.colorComponents};
        padding: 10px 0;
        border-radius: 12px;

        .listTypes {
            padding: 0;
            margin: 0;
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 2px;

            .listTypeItem {
                padding: 5px 12px;
                display: flex;
                gap: 12px;
                align-items: center;
                color: ${(props) => props.Theme.colorTitle};
                transition: all 0.3s ease;
                cursor: pointer;

                span {
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    &.tr {
                        background-color: ${(props) =>
                            props.Theme.colorPrimary};
                    }
                    &.ex {
                        background-color: ${(props) =>
                            props.Theme.expenseColor};
                    }
                    &.in {
                        background-color: ${(props) => props.Theme.incomeColor};
                    }
                    &.tra {
                        background-color: ${(props) =>
                            props.Theme.transferColor};
                    }
                }

                &:hover {
                    background-color: ${(props) => props.Theme.colorBorder};
                }
            }
        }
    }
`;
