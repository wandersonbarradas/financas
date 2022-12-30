import { display } from "@mui/system";
import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
};
export const Container = styled.div<Props>`
    padding: 24px 24px 0 36px;
    max-width: 1440px;
    margin: 0 auto;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            font-size: 30px;
            margin: 0;
            font-weight: 600;
            color: ${(props) => props.Theme.colorTitle};
        }

        .actions {
            display: flex;
            justify-content: center
            align-items: center;

            .icon {
                width: 48px;
                height: 48px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                color: ${(props) => props.Theme.colorPrimary};
                background-color: ${(props) => props.Theme.colorComponents};
                border-radius: 50%;
                transition: all .3s ease;
                &:hover {
                    background-color: ${(props) => props.Theme.colorBorder};
                }
            }
        }        
    }

    .body {
        margin-top: 32px;
    }

    .box-account {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: start;
        gap: 30px;
        transition: all .3s ease;
    }

    .modal {
        transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        display: flex;
        justify-content: center;
        align-items: center;
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
