import { display } from "@mui/system";
import { ThemeValues } from "./../../reducers/ThemeReducer";
import styled from "styled-components";
type props = {
    Theme: ThemeValues;
};
export const Container = styled.div<props>`
    position: absolute;
    top: 100px;
    left: 50%;
    margin-left: -107px;
    background-color: ${(props) => props.Theme.colorComponents};
    width: 300px;
    border-radius: 20px;
    color: #fff;
    z-index: 60;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 8px 13px 44px -6px rgba(0, 0, 0, 0.5);

    &.hygsb {
        margin-left: -25px;
    }
    .header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: ${(props) => props.Theme.colorPrimary};
        padding: 12px 6px;
        border-radius: 20px 20px 0 0;

        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            transition: all 0.3s ease;
            cursor: pointer;

            &:hover {
                background-color: rgba(175, 174, 254, 0.3);
            }
        }
    }
    .year {
        font-weight: 600;
    }

    .body {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        align-items: center;
        padding: 20px 10px;

        .itemMonth {
            display: block;
            flex: 1;
            text-align: center;
            padding: 7px;
            border-radius: 16px;
            font-weight: 600;
            color: ${(props) => props.Theme.colorTitle};
            font-size: 13px;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                background-color: ${(props) => props.Theme.colorContainer};
            }

            &.current {
                color: ${(props) => props.Theme.colorPrimary};
            }
        }
    }

    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;

        button {
            padding: 6px 8px;
            color: ${(props) => props.Theme.colorPrimary};
            font-size: 14px;
            background-color: transparent;
            border: 0;
            outline: 0;
            border-radius: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                background-color: rgba(76, 73, 237, 0.2);
            }
        }
    }

    @media screen and (max-width: 992px) {
        margin-left: -150px !important;
    }
    @media screen and (max-width: 576px) {
        top: 85px;
    }
`;
