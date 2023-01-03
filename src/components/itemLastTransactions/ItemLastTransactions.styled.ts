import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";
type Props = {
    colorValue: string;
    Theme: ThemeValues;
};

export const Container = styled.li<Props>`
    display: flex;
    align-items: center;
    padding: 8px 8px;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${(props) => props.Theme.colorBorder};
    }

    .profile {
        color: ${(props) => props.Theme.colorPrimary};
        font-size: 30px;
        width: 42px;
        height: 42px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .box-info {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;

        .title-transaction {
            color: ${(props) => props.Theme.colorTitle};
            margin: 0;
            font-family: "Mulish", sans-serif;
            font-style: normal;
            font-weight: 500;
            font-size: 17px;
            line-height: 21px;
            letter-spacing: -0.02em;
            max-width: 180px;
        }

        .categorie-transaction {
            font-weight: 500;
            font-size: 14px;
            line-height: 18px;
            letter-spacing: -0.02em;
            margin: 0;
            color: ${(props) => props.Theme.colorOpacity};
            max-width: 180px;
        }

        .value {
            white-space: nowrap;
            font-weight: 500;
            font-size: 18px;
            line-height: 23px;
            text-align: right;
            letter-spacing: -0.02em;
            color: ${(props) => props.colorValue};
        }
    }

    @media screen and (max-width: 470px) {
        /* .box-info {
            flex-direction: column;
            align-items: flex-start;
        } */
    }
`;
