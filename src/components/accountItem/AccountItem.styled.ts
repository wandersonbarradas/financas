import { display } from "@mui/system";
import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
};

export const Container = styled.div<Props>`
    background-color: ${(p) => p.Theme.colorComponents};
    border: solid 1px ${(p) => p.Theme.colorBorder};
    border-radius: 12px;
    padding-top: 12px;
    width: 300px;

    .headerAccount {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding: 0 12px;

        .bankInfo {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .bankImage {
                width: 36px;
                height: 36px;
                margin-right: 12px;

                img {
                    width: 100%;
                    border-radius: 50%;
                }
            }

            .label {
                font-size: 1.25rem;
                font-weight: 500;
                color: ${(p) => p.Theme.colorTitle};
            }
        }

        .icon {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: ${(p) => p.Theme.colorOpacity};
            transition: all 0.3s ease;
            cursor: pointer;

            &:hover {
                background-color: ${(p) => p.Theme.colorBorder};
            }
        }
    }

    .rowResume {
        padding: 0 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;

        .label {
            color: ${(p) => p.Theme.colorTitle};
            font-size: 1rem;
            font-weight: 500;
        }

        .value {
            color: #4fd18b;
            font-size: 1rem;
            font-weight: 500;

            &.less {
                color: ${(i) => i.Theme.expenseColor};
            }
            &.more {
                color: ${(i) => i.Theme.incomeColor};
            }
        }
    }

    .add-expense {
        font-family: "Poppins", sans-serif;
        width: 100%;
        margin-top: 20px;
        border: 0;
        border-top: solid 1px ${(p) => p.Theme.colorBorder};
        outline: 0;
        background-color: transparent;
        padding: 12px 12px;
        text-align: end;
        font-size: 1rem;
        font-weight: 500;
        color: ${(p) => p.Theme.colorPrimary};
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            color: ${(p) => p.Theme.colorSecundary};
        }
    }

    @media screen and (max-width: 576px) {
        width: 100%;
    }
`;

type PropsToggleMenu = {
    Theme: ThemeValues;
    Position: {
        top: number;
        left: number;
    };
};

export const ToggleMenu = styled.ul<PropsToggleMenu>`
    background-color: ${(p) => p.Theme.colorComponents};
    position: absolute;
    top: ${(p) => p.Position.top}px;
    left: ${(p) => p.Position.left}px;
    padding: 6px 0;
    margin: 0;
    list-style: none;
    border-radius: 12px;
    border: solid 1px ${(p) => p.Theme.colorBorder};

    li {
        min-width: 130px;
        padding: 5px 8px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 12px;
        color: ${(p) => p.Theme.colorOpacity};
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
            background-color: ${(p) => p.Theme.colorBorder};
        }
    }
`;
