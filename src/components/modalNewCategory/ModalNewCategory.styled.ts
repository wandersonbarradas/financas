import { ThemeValues } from "./../../reducers/ThemeReducer";
import styled from "styled-components";

type Props = {
    Theme: ThemeValues;
    Type: "expense" | "income";
};

export const Container = styled.div<Props>`
    max-width: 500px;
    width: 100%;
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
                border-bottom: 2px solid ${(props) => props.Theme.colorOpacity};
                padding: 8px 2px;
                font-weight: 500;
                transition: 0.3s all ease;

                &::placeholder {
                    color: ${(props) => props.Theme.colorOpacity};
                    font-weight: 500;
                }

                &:focus {
                    border-color: ${(props) =>
                        props.Type === "expense" ? "#f02927" : "#4FD18B"};
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
                    background-color: ${(props) => props.Theme.colorBorder};
                    color: ${(props) => props.Theme.colorOpacity};
                    font-weight: 500;
                    cursor: not-allowed;
                }
            }
        }
    }
`;
