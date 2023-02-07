import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
    Color: string;
    Type: "expense" | "income";
};

export const Container = styled.tr<Props>`
    td {
        .nameCategory {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        color: ${(props) => props.Theme.colorTitle};
        border-bottom: 1px solid ${(props) => props.Theme.colorBorder};
        padding: 10px;
        text-align: start;
        font-weight: 300;
        font-size: 0.875rem;
        &:last-child {
            padding-right: 30px;
        }
        &:first-child {
            padding-left: 30px;
        }

        span {
            color: inherit;
            display: block;
            margin: 14px 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .colorCategory {
            width: 20px;
            height: 20px;
            background-color: ${(props) => props.Color};
            border-radius: 50%;

            &.small {
                width: 15px;
                height: 15px;
            }
        }

        .actionArea {
            display: flex;
            justify-content: flex-start;
            gap: 20px;

            .icon {
                width: 40px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;

                &:hover {
                    background-color: ${(props) => props.Theme.colorBorder};
                }

                &.add {
                    background-color: ${(props) =>
                        props.Type === "expense" ? "#f02927" : "#4FD18B"};

                    &:hover {
                        background-color: ${(props) =>
                            props.Type === "expense" ? "#fb0400" : "#14F07B"};
                    }
                }
            }
        }
    }
`;
