import { display } from "@mui/system";
import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
    Modal: { display: boolean; opacity: number };
    Type: string;
    inputSearch: boolean;
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

                &.add {
                    color: ${(props) =>
                        props.Type === "expense" ? "#f02927" : "#4FD18B"};
                }

                &.btn-search {
                    justify-content: flex-start;
                    width: ${(props) => (props.inputSearch ? 300 : 48)}px;
                    border-radius: ${(props) =>
                        props.inputSearch ? 12 : 48}px;
                    padding: 0 10px;
                    gap: 10px;

                    input {
                        display: block;
                        width: ${(props) => (props.inputSearch ? 350 : 0)}px;
                        background-color: transparent;
                        border: 0;
                        outline: 0;
                        height: 100%;
                        color: ${(props) => props.Theme.colorTitle};
                        font-size: 16px;
                    }
                }
            }
        }

        .rightSide {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            .typeCategoria {
                background-color: ${(props) =>
                    props.Type === "expense" ? "#f02927" : "#4FD18B"};
                color: #ffffff;
                width: 245px;
                height: 48px;
                font-weight: 500;
                border-radius: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                gap: 5px;
                transition: all 0.3s ease;

                &:hover {
                    background-color: ${(props) =>
                        props.Type === "expense" ? "#fb0400" : "#14F07B"};
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

        .tableCategoria {
            width: 100%;
            border-spacing: 0;
        }

        thead {
            background-color: ${(props) => props.Theme.colorBorder};
        }

        th {
            padding: 15px 10px;
            text-align: start;
            color: ${(props) => props.Theme.colorTitle};
            border-bottom: 1px solid ${(props) => props.Theme.colorBorder};
            font-weight: 400;
            font-size: 16px;
            width: 20%;
            &:last-child {
                padding-right: 30px;
            }
            &:first-child {
                padding-left: 30px;
                width: 40%;
            }
        }

        .footerTable {
            height: 30px;
            width: 100%;
        }
    }
    .containerModal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        opacity: ${(props) => props.Modal.opacity};
        transition: all 0.1s ease;
        display: flex;
        align-items: center;
        justify-content: center;

        .modalTypeCategoria {
            width: 245px;
            padding: 10px 0;
            background-color: ${(props) => props.Theme.colorComponents};
            position: absolute;
            right: 30px;
            top: 210px;
            border-radius: 12px;
            border: 1px solid ${(props) => props.Theme.colorBorder};
            ul {
                list-style: none;
                margin: 0;
                padding: 0;

                li {
                    padding: 10px;
                    color: ${(props) => props.Theme.colorOpacity};
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.3s ease;

                    &:hover {
                        background-color: ${(props) => props.Theme.colorBorder};
                    }
                }
            }
        }

        .modalNewCategory {
            width: 500px;
            background-color: ${(props) => props.Theme.colorComponents};
            border: 1px solid ${(props) => props.Theme.colorBorder};
            padding: 10px 20px 30px 20px;
            border-radius: 12px;

            h4 {
                margin: 0;
                color: ${(props) => props.Theme.colorTitle};
                font-weight: 500;
                font-size: 22px;
            }

            .form {
                margin-top: 20px;
                padding: 0 10px;

                .inptu-item {
                    width: 100%;

                    input {
                        width: 100%;
                        display: block;
                        outline: 0;
                        border: 0;
                        background-color: transparent;
                        color: ${(props) => props.Theme.colorTitle};
                        font-size: 16px;
                        border-bottom: 2px solid
                            ${(props) => props.Theme.colorOpacity};
                        padding: 8px 2px;
                        font-weight: 500;
                        transition: 0.3s all ease;

                        &::placeholder {
                            color: ${(props) => props.Theme.colorOpacity};
                            font-weight: 500;
                        }

                        &:focus {
                            border-color: ${(props) =>
                                props.Type === "expense"
                                    ? "#f02927"
                                    : "#4FD18B"};
                        }
                    }
                }

                .otherFields {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;

                    .field {
                        /* display: flex; */

                        label {
                            display: block;
                            color: ${(props) => props.Theme.colorTitle};
                        }

                        input {
                            border-radius: 10px;
                            width: 70px;
                            height: 35px;
                            border: 0;
                            overflow: hidden;
                            background-color: transparent;
                            cursor: pointer;
                            padding: 0;
                        }
                    }
                }

                .footer {
                    margin-top: 20px;
                    display: flex;
                    justify-content: flex-end;

                    button {
                        font-family: "Poppins", sans-serif;
                        padding: 10px;
                        border-radius: 8px;
                        border: 0;
                        outline: 0;
                        background-color: ${(props) =>
                            props.Type === "expense" ? "#f02927" : "#4FD18B"};
                        color: #ffffff;
                        cursor: pointer;

                        &:disabled {
                            background-color: ${(props) =>
                                props.Theme.colorBorder};
                            color: ${(props) => props.Theme.colorOpacity};
                            font-weight: 500;
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 780px) {
        .tableCategoria {
            display: none;
        }
    }
`;
