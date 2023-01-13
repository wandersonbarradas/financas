import { display } from "@mui/system";
import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
};

export const Container = styled.div<Props>`
    background-color: ${(props) => props.Theme.colorComponents};
    border: solid 1px ${(props) => props.Theme.colorBorder};
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
                font-size: 20px;
                font-weight: 500;
                color: ${(props) => props.Theme.colorTitle};
            }
        }

        .icon {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: ${(props) => props.Theme.colorOpacity};
            transition: all 0.3s ease;
            cursor: pointer;

            &:hover {
                background-color: ${(props) => props.Theme.colorBorder};
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
            color: ${(props) => props.Theme.colorTitle};
            font-size: 16px;
            font-weight: 500;
        }

        .value {
            color: #4fd18b;
            font-size: 16px;
            font-weight: 500;

            &.less {
                color: #ff0000;
            }
            &.more {
                color: #4fd18b;
            }
        }
    }

    .add-expense {
        font-family: "Poppins", sans-serif;
        width: 100%;
        margin-top: 20px;
        border: 0;
        border-top: solid 1px ${(props) => props.Theme.colorBorder};
        outline: 0;
        background-color: transparent;
        padding: 12px 12px;
        text-align: end;
        font-size: 16px;
        font-weight: 500;
        color: ${(props) => props.Theme.colorPrimary};
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            color: ${(props) => props.Theme.colorSecundary};
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
    background-color: ${(props) => props.Theme.colorComponents};
    position: absolute;
    top: ${(props) => props.Position.top}px;
    left: ${(props) => props.Position.left}px;
    padding: 6px 0;
    margin: 0;
    list-style: none;
    border-radius: 12px;
    border: solid 1px ${(props) => props.Theme.colorBorder};

    li {
        min-width: 130px;
        padding: 5px 8px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 12px;
        color: ${(props) => props.Theme.colorOpacity};
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
            background-color: ${(props) => props.Theme.colorBorder};
        }
    }
`;
