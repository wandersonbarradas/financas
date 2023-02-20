import { display } from "@mui/system";
import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
    CategoryColor: string;
    Type: string;
};
export const Container = styled.div<Props>`
    display: flex;
    padding: 10px 20px;
    align-items: center;
    transition: all 0.2s ease;

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
                background-color: red;
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

    .actionMobile {
        display: none;
        justify-content: center;
        align-items: center;

        .icon {
            padding: 5px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;

            &.add {
                background-color: red;
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
        .actionMobile {
            display: flex;
        }
    }
`;

type PropsActionsMobile = {
    Theme: ThemeValues;
    coordinates: {
        top: number;
        left: number;
    };
};

export const MenuActionsMobile = styled.div<PropsActionsMobile>`
    background-color: ${(i) => i.Theme.colorComponents};
    border: 1px solid ${(i) => i.Theme.colorBorder};
    border-radius: 10px;
    min-width: 120px;
    padding: 10px 0;
    position: absolute;
    top: ${(i) => i.coordinates.top}px;
    left: ${(i) => i.coordinates.left}px;

    .optionsItem {
        display: flex;
        gap: 10px;
        color: ${(i) => i.Theme.colorTitle};
        padding: 10px;
        cursor: pointer;
        transition: all 150ms ease;

        &:hover {
            background-color: ${(i) => i.Theme.colorBorder};
        }
    }
`;
