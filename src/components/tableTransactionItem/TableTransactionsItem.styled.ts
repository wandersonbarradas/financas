import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
    categoryColor: string;
};
export const Container = styled.tr<Props>`
    td:last-child {
        padding-right: 20px;
    }
    td:first-child {
        padding-left: 20px;
    }

    td {
        color: ${(props) => props.Theme.colorTitle};
        border-bottom: 1px solid ${(props) => props.Theme.colorBorder};
        padding: 10px;
        text-align: start;
        font-weight: 300;
        font-size: 13px;

        &.done {
            width: 10%;
            .icon {
                justify-content: flex-start;
                &.true {
                    svg {
                        padding: 3px;
                        border-radius: 50%;
                        background-color: ${(props) => props.Theme.incomeColor};
                    }
                }
                &.false {
                    svg {
                        padding: 3px;
                        border-radius: 50%;
                        background-color: ${(props) =>
                            props.Theme.expenseColor};
                    }
                }
            }
        }

        &.date {
            width: 10%;
        }

        &.description {
            width: 20%;
        }

        &.category {
            width: 20%;
            div {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            span {
                display: block;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background-color: ${(props) => props.categoryColor};
            }
        }

        &.account {
            width: 20%;
        }

        &.actionArea {
            width: 10%;
            div {
                display: flex;
                gap: 10px;

                .icon {
                    padding: 10px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.3s ease;

                    &:hover {
                        background-color: ${(props) => props.Theme.colorBorder};
                    }
                }
            }
        }

        &.value {
            width: 12%;
            p {
                font-weight: 500;
                &.transfer {
                    color: ${(props) => props.Theme.transferColor};
                }

                &.expense {
                    color: ${(props) => props.Theme.expenseColor};
                }

                &.income {
                    color: ${(props) => props.Theme.incomeColor};
                }
            }
        }
    }
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

type PropsModalDelete = {
    Theme: ThemeValues;
    Color: string;
};

export const ContainerModalDelete = styled.div<PropsModalDelete>`
    padding: 16px 26px;
    background-color: ${(props) => props.Theme.colorComponents};
    border: 1px solid ${(props) => props.Theme.colorComponents};
    border-radius: 12px;
    width: 550px;

    h3 {
        font-size: 22px;
        margin: 0 0 20px 0;
        color: ${(props) => props.Theme.colorTitle};
        font-weight: 500;
    }

    .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;

        .title {
            font-weight: 600;
            color: ${(props) => props.Theme.colorOpacity};
            margin: 0;
            font-size: 14px;
        }

        span {
            color: ${(props) => props.Theme.colorOpacity};
            font-size: 14px;
        }
    }

    .btnArea {
        margin-top: 20px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .btn {
            padding: 6px 20px;
            border-radius: 20px;
            outline: 0;
            border: 1px solid ${(props) => props.Color};
            background-color: transparent;
            color: ${(props) => props.Theme.colorTitle};
            font-family: "Poppins", sans-serif;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.15s ease;

            &.deletar {
                background-color: ${(props) => props.Color};
                &:hover {
                    opacity: 0.8;
                }
            }

            &.cancelar {
                opacity: 0.8;
                &:hover {
                    opacity: 1;
                }
            }
        }
    }
`;
