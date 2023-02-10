import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
    extend: boolean;
    colorTransaction: { solid: string; rgba: string };
};
export const Container = styled.div<Props>`
    width: 100%;
    max-width: 500px;
    padding: 16px 26px;
    z-index: 30;
    border-radius: 16px;
    background-color: ${(props) => props.Theme.colorComponents};
    border: solid 1px ${(props) => props.Theme.colorBorder};
    max-height: 100vh;
    overflow-y: auto;

    .headerContent {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h3 {
            color: ${(props) => props.Theme.colorTitle};
            margin: 0 0 10px 0;
            font-weight: 500;
            font-size: 1.25rem;
        }
    }

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${(props) => props.Theme.colorOpacity};
        cursor: pointer;
        transition: all 0.2s ease;

        &.rot {
            transform: rotate(180deg);
        }
    }

    .bodyContent {
        transition: all 0.3s ease;
        width: 100%;

        .warning {
            position: relative;
            &::after {
                z-index: 1;
                left: 0;
                right: 0;
                bottom: -15px;
                content: "Campo obrigatório";
                position: absolute;
                transition: border-bottom-color 300ms ease-in-out;
                pointer-events: none;
                font-size: 0.625rem;
                color: #ff9800;
                width: 200px;
            }

            &.valueWarning {
                ::after {
                    content: "Valor deve ser maior que 0";
                }
            }
        }

        .left-side {
            transition: all 0.3s ease;
        }

        .input-area {
            width: 100%;
            display: flex;
            align-items: center;
            height: 42px;
            padding-bottom: 8px;
            transition: border-bottom-color 300ms ease-in-out;
            border-radius: 1px;
            margin-top: 20px;
            position: relative;

            &.focus,
            &:hover {
                &::before {
                    border-bottom: 2px solid
                        ${(props) => props.colorTransaction.solid};
                }
            }

            &::before {
                left: 0;
                right: 0;
                bottom: 0;
                content: "";
                position: absolute;
                transition: border-bottom-color 300ms ease-in-out;
                border-bottom: 1px solid ${(props) => props.Theme.colorOpacity};
                pointer-events: none;
            }

            &.colorWarning {
                ::before {
                    border-color: #ff9800;
                }
            }

            input {
                border: 0;
                outline: 0;
                background-color: transparent;
            }

            &.date {
                .btn-date {
                    font-family: "Poppins", sans-serif;
                    margin-left: 16px;
                    background-color: ${(props) => props.Theme.colorOpacity};
                    outline: none;
                    border: 0;
                    border-radius: 46px;
                    padding: 5px 12px;
                    color: #fff;
                    font-weight: 400;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: ${(props) =>
                        props.extend ? "none" : "inline-block"};

                    &.select-btn-date {
                        background-color: ${(props) =>
                            props.colorTransaction.solid};
                    }

                    &:nth-of-type(1) {
                        margin-left: 32px;
                    }
                }
                .date-extense {
                    display: ${(props) => (props.extend ? "block" : "none")};
                    font-size: 0.9375rem;
                    color: ${(props) => props.Theme.colorTitle};
                    margin: 3px 0 0 32px;
                }
            }

            &.value {
                span {
                    margin: 0 5px 0 32px;
                    color: ${(props) => props.colorTransaction.solid};
                    font-size: 1.25rem;
                }
                input {
                    color: ${(props) => props.colorTransaction.solid};
                    font-family: "Inter", sans-serif;
                    font-weight: 400;
                    font-size: 1.25rem;
                    max-width: 200px;

                    &::placeholder {
                        color: ${(props) => props.colorTransaction.solid};
                        opacity: 1;
                    }
                }
            }

            input[type="button"],
            input[type="text"] {
                width: 100%;
                font-family: "Poppins", sans-serif;
                font-size: 1rem;
                color: ${(props) => props.Theme.colorTitle};

                &::placeholder {
                    color: ${(props) => props.Theme.colorOpacity};
                    opacity: 1;
                    font-size: 0.875rem;
                    font-weight: 400;
                }
            }

            &.description {
                input {
                    margin-left: 32px;
                }
            }

            &.category {
                .content.empty {
                    &::before {
                        content: "Categoria";
                    }
                }
            }

            &.account {
                margin-bottom: 20px;
                .content.empty {
                    &::before {
                        content: "Account";
                    }
                }

                &.tr {
                    .content.empty {
                        &::before {
                            content: "De";
                        }
                    }
                }
            }

            &.accountFor {
                margin-bottom: 20px;
                .content.empty {
                    &::before {
                        content: "Para";
                    }
                }
            }

            .content {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-left: 32px;
                position: relative;

                input {
                    max-width: 100%;
                }
                &.empty {
                    &::before {
                        left: 0;
                        right: 0;
                        bottom: 0;
                        content: "";
                        position: absolute;
                        color: ${(props) => props.Theme.colorOpacity};
                        font-weight: 400;
                        font-size: 0.875rem;
                    }
                }
            }
        }

        .checkArea {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 30px 0;

            .leftArea {
                display: flex;
                align-items: center;

                span {
                    margin-left: 32px;
                    color: ${(props) => props.Theme.colorOpacity};
                    font-weight: 500;
                }
            }

            .cl-toggle-switch {
                justify-self: flex-end;
                position: relative;
            }

            .cl-switch {
                position: relative;
                display: inline-block;
                cursor: pointer;
            }
            /* Input */
            .cl-switch > input {
                appearance: none;
                -moz-appearance: none;
                -webkit-appearance: none;
                z-index: -1;
                position: absolute;
                right: 6px;
                top: -8px;
                display: block;
                margin: 0;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                background-color: rgb(0, 0, 0, 0.38);
                outline: none;
                opacity: 0;
                transform: scale(1);
                pointer-events: none;
                transition: opacity 0.3s 0.1s, transform 0.2s 0.1s;
            }
            /* Track */
            .cl-switch > span::before {
                content: "";
                float: right;
                display: inline-block;
                margin: 5px 0 5px 10px;
                border-radius: 7px;
                width: 36px;
                height: 14px;
                background-color: ${(props) => props.Theme.colorBorder};
                vertical-align: top;
                transition: background-color 0.2s, opacity 0.2s;
            }
            /* Thumb */
            .cl-switch > span::after {
                content: "";
                position: absolute;
                top: 2px;
                right: 16px;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                background-color: ${(props) => props.Theme.colorOpacity};
                box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
                    0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12);
                transition: background-color 0.2s, transform 0.2s;
            }
            /* Checked */
            .cl-switch > input:checked {
                right: -10px;
                background-color: rgba(240, 41, 39, 0.38);
            }

            .cl-switch > input:checked + span::before {
                background-color: ${(props) => props.colorTransaction.rgba};
            }

            .cl-switch > input:checked + span::after {
                background-color: ${(props) => props.colorTransaction.solid};
                transform: translateX(16px);
            }
            /* Hover, Focus */
            .cl-switch:hover > input {
                opacity: 0.04;
            }

            .cl-switch > input:focus {
                opacity: 0.12;
            }

            .cl-switch:hover > input:focus {
                opacity: 0.16;
            }
            /* Active */
            .cl-switch > input:active {
                opacity: 1;
                transform: scale(0);
                transition: transform 0s, opacity 0s;
            }

            .cl-switch > input:active + span::before {
                background-color: ${(props) => props.Theme.colorOpacity};
            }

            .cl-switch > input:checked:active + span::before {
                background-color: ${(props) => props.Theme.colorBorder};
            }
            /* Disabled */
            .cl-switch > input:disabled {
                opacity: 0;
            }

            .cl-switch > input:disabled + span::before {
                background-color: #ddd;
            }

            .cl-switch > input:checked:disabled + span::before {
                background-color: #bfdbda;
            }

            .cl-switch > input:checked:disabled + span::after {
                background-color: #61b5b4;
            }
        }

        .right-side {
            width: 0vw;
            max-width: 40vw;
            transition: all 0.3s ease;
            overflow-x: hidden;
        }
    }
    .footerModalTransaction {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 16px 0 10px 0;
        gap: 20px;

        button {
            font-family: "Poppins", sans-serif;
            padding: 8px 22px;
            background-color: ${(props) => props.Theme.colorPrimary};
            border-radius: 25px;
            font-size: 1rem;
            width: 175px;
            outline: 0;
            border: 0;
            color: #ffffff;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;

            &:disabled {
                background-color: ${(props) => props.Theme.colorBorder};
                color: ${(props) => props.Theme.colorOpacity};
                cursor: not-allowed;
            }
        }
    }

    .containerAccounts {
        padding: 12px 0;
        width: 100%;
        max-width: 400px;
        max-height: 400px;
        overflow-y: auto;
        background-color: ${(props) => props.Theme.colorComponents};
        border: 1px solid ${(props) => props.Theme.colorBorder};
        border-radius: 12px;
    }

    @media screen and (max-width: 576px) {
        max-width: 100%;
        border-radius: 40px 40px 0 0;
        max-height: auto;
        flex: 1;
        position: relative;
        border-left: 0;
        border-right: 0;
        border-bottom: 0;

        .headerContent {
            display: none;
        }

        .bodyContent .input-area {
            margin-top: 30px;
        }

        .footerModalTransaction {
            position: fixed;
            bottom: 10px;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            button {
                width: 120px;
            }
        }
    }
`;

type PropsAccount = {
    Theme: ThemeValues;
};

export const AccountItem = styled.div<PropsAccount>`
    width: 100%;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;

    img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
    }

    span {
        color: ${(props) => props.Theme.colorTitle};
        margin-left: 10px;
    }

    &:hover {
        background-color: ${(props) => props.Theme.colorBorder};
    }
`;

type PropsCategory = {
    Theme: ThemeValues;
    color: string;
};

export const CategoryItem = styled.div<PropsCategory>`
    width: 100%;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;

    .color {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: ${(props) => props.color};

        &.sub {
            width: 16px;
            height: 16px;
        }
    }

    .icon {
        color: ${(props) => props.Theme.colorOpacity};
        margin: 0 10px 0 1px;
    }

    span {
        color: ${(props) => props.Theme.colorTitle};
        margin-left: 10px;

        &.sub {
            font-size: 0.875rem;
        }
    }

    &:hover {
        background-color: ${(props) => props.Theme.colorBorder};
    }
`;
