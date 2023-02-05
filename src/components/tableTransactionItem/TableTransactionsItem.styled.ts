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
        font-size: 14px;

        &.done {
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

        &.description {
            max-width: 350px;
        }
        &.category {
            div {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            span {
                display: block;
                max-width: 16px;
                min-width: 16px;
                max-height: 16px;
                min-height: 16px;
                border-radius: 50%;
                background-color: ${(props) => props.categoryColor};
            }
        }

        &.value {
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

        &.actionArea {
            div {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                gap: 10px;

                .icon {
                    padding: 10px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    color: ${(props) => props.Theme.colorOpacity};

                    &:hover {
                        background-color: ${(props) => props.Theme.colorBorder};
                    }
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
