import { display } from "@mui/system";
import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
};
export const Container = styled.div<Props>`
    width: 100%;
    max-width: 430px;
    max-height: 550px;
    background-color: ${(props) => props.Theme.colorComponents};
    border: 1px solid ${(props) => props.Theme.colorBorder};
    border-radius: 12px;
    padding: 16px 0;

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${(props) => props.Theme.colorOpacity};
        cursor: pointer;
    }

    .headerSelectAccounts {
        display: flex;
        padding: 0px 24px 16px 24px;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid ${(props) => props.Theme.colorBorder};

        h3 {
            margin: 0;
            font-weight: 500;
            font-size: 18px;
            color: ${(props) => props.Theme.colorTitle};
        }
    }
    .searchArea {
        padding: 16px 24px;
        .content {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 20px;
            padding-bottom: 5px;
            position: relative;

            input {
                font-family: "Poppins", sans-serif;
                background-color: transparent;
                border: 0;
                outline: 0;
                font-size: 16px;
                font-weight: 400;
                color: ${(props) => props.Theme.colorTitle};

                &::placeholder {
                    font-family: "Poppins", sans-serif;
                    font-weight: 400;
                }
            }

            &:hover {
                &::before {
                    border-bottom: 2px solid
                        ${(props) => props.Theme.colorOpacity};
                }
            }

            &::before {
                left: 0;
                right: 0;
                bottom: 0;
                content: "";
                position: absolute;
                transition: border-bottom-color 200ms
                    cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                border-bottom: 1px solid ${(props) => props.Theme.colorOpacity};
                pointer-events: none;
            }
        }
    }

    .bodySelectAccounts {
        max-height: 410px;
        overflow-x: auto;
        .selectItem {
            width: 100%;
            display: flex;
            align-items: center;
            background-color: ${(props) => props.Theme.colorComponents};
            transition: all 0.3s ease;
            padding: 0 24px;
            cursor: pointer;

            &:hover {
                background-color: ${(props) => props.Theme.colorBorder};
            }

            .img {
                width: 40px;
                height: 40px;
                margin-right: 12px;
                img {
                    width: 100%;
                    border-radius: 50%;
                }
            }

            p {
                color: ${(props) => props.Theme.colorTitle};
                font-size: 16px;
                font-weight: 500;
            }
        }
    }
`;
