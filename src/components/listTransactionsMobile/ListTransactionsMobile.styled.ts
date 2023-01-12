import { display } from "@mui/system";
import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
    ColorCategory: string;
};
export const Container = styled.div<Props>`
    display: flex;
    .transactionColor {
        display: flex;
        align-items: center;
        .transactionBoxColor {
            display: block;
            width: 32px;
            height: 32px;
            background-color: ${(i) => i.ColorCategory};
            border-radius: 50%;
        }
    }
    .transactionInfo {
        flex: 1;
        padding: 10px 20px;

        .transactionDescription {
            margin: 0;
            font-size: 14px;
            color: ${(i) => i.Theme.colorTitle};
        }
        .transactionAC {
            color: ${(i) => i.Theme.colorOpacity};
            font-size: 12px;
        }
    }

    .transactionValueAction {
        align-items: end;
        gap: 5px;
        .transactionValue {
            font-size: 12px;

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

        .transactionDone {
            .icon {
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                color: ${(props) => props.Theme.colorTitle};
                padding: 1px;

                svg {
                    font-size: 1.1rem;
                }

                &.true {
                    background-color: ${(i) => i.Theme.incomeColor};
                }

                &.false {
                    background-color: ${(i) => i.Theme.expenseColor};
                }
            }
        }
    }

    .flex-column {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;
