import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
    extend: boolean;
};
export const Container = styled.div<Props>`
    padding: 16px;
    border-radius: 16px;
    background-color: ${(props) => props.Theme.colorComponents};
    border: solid 1px ${(props) => props.Theme.colorBorder};

    .modalDatePicker {
        width: 100vw;
        height: 100vh;
        max-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 20;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h3 {
            color: ${(props) => props.Theme.colorTitle};
            margin: 0;
            font-weight: 700;
            font-size: 20px;
        }
    }

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${(props) => props.Theme.colorOpacity};
        cursor: pointer;
    }

    .body {
        display: flex;
        transition: all 0.3s ease;
        overflow: hidden;

        .left-side {
            width: 40vw;
            max-width: 40vw;
            transition: all 0.3s ease;
        }

        .input-area {
            width: 100%;
            display: flex;
            padding-bottom: 8px;
            border-bottom: 2px solid ${(props) => props.Theme.colorOpacity};
            transition: border-bottom-color 0.3s ease;
            border-radius: 1px;
            margin-top: 30px;

            &.focus {
                border-color: #d14f4f;
            }

            &.date {
                input[type="date"] {
                    /* display: none; */
                }

                .btn-date {
                    margin-left: 16px;
                    background-color: ${(props) => props.Theme.colorOpacity};
                    outline: none;
                    border: 0;
                    border-radius: 46px;
                    padding: 5px 12px;
                    color: #fff;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: ${(props) =>
                        props.extend ? "none" : "inline-block"};

                    &.select-btn-date {
                        background-color: #d14f4f;
                    }

                    &:nth-of-type(1) {
                        margin-left: 32px;
                    }
                }
                .date-extense {
                    display: ${(props) => (props.extend ? "block" : "none")};
                    font-size: 15px;
                    color: ${(props) => props.Theme.colorTitle};
                    margin: 3px 0 0 32px;
                }
            }

            &.value {
                span {
                    margin: 0 5px 0 32px;
                    color: #d14f4f;
                    font-size: 20px;
                }
                input {
                    border: 0;
                    outline: 0;
                    background-color: transparent;
                    color: #d14f4f;
                    font-family: "Inter", sans-serif;
                    font-weight: 600;
                    font-size: 20px;
                    position: relative;

                    &::placeholder {
                        color: #d14f4f;
                    }
                }
            }
        }

        .right-side {
            width: 0vw;
            max-width: 40vw;
            transition: all 0.3s ease;
            overflow-x: hidden;
        }
    }
`;
