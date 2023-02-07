import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
    CategoryColor: string;
    Type: string;
};
export const Container = styled.div<Props>`
    display: flex;
    padding: 20px;
    align-items: center;

    &:hover {
        background-color: ${(i) => i.Theme.colorBorder};
    }

    .categoryColor {
        display: flex;
        align-items: center;
        gap: 5px;
        .colorCategory {
            display: block;
            width: 30px;
            height: 30px;
            background-color: ${(i) => i.CategoryColor};
            border-radius: 50%;

            &.small {
                width: 15px;
                height: 15px;
            }
        }
    }
    .categoryName {
        flex: 1;
        padding: 10px 20px;

        p {
            margin: 0;
            font-size: 0.875rem;
            color: ${(i) => i.Theme.colorTitle};
        }
    }

    .categoryActionArea {
        display: flex;
        gap: 20px;

        .icon {
            padding: 5px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;

            &.add {
                background-color: ${(i) =>
                    i.Type === "expense"
                        ? i.Theme.expenseColor
                        : i.Theme.incomeColor};
                &:hover {
                    background-color: #fb0400;
                }
            }

            &:hover {
                background-color: ${(i) => i.Theme.colorOpacity};
            }
        }
    }

    .more {
        display: none;
        justify-content: center;
        align-items: center;

        .icon {
            padding: 5px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                background-color: ${(i) => i.Theme.colorOpacity};
            }
        }
    }

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${(i) => i.Theme.colorTitle};
    }

    @media screen and (max-width: 576px) {
        .categoryActionArea {
            display: none;
        }
        .more {
            display: flex;
        }
    }
`;
