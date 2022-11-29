import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";
type Props = {
    colorValue: string;
    Theme: ThemeValues;
};

export const Container = styled.li<Props>`
    display: flex;
    align-items: center;
    padding: 7px 0;
    cursor: pointer;

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
        justify-content: space-between;
        align-items: center;

        .title-transaction {
            color: ${(props) => props.Theme.colorTitle};
            margin: 0;
            font-family: "Mulish";
            font-style: normal;
            font-weight: 800;
            font-size: 17px;
            line-height: 21px;
            letter-spacing: -0.02em;
        }

        .categorie-transaction {
            font-weight: 700;
            font-size: 14px;
            line-height: 18px;
            letter-spacing: -0.02em;
            color: #a29ebc;
        }

        .value {
            font-weight: 800;
            font-size: 18px;
            line-height: 23px;
            text-align: right;
            letter-spacing: -0.02em;
            color: ${(props) => props.colorValue};
        }
    }
`;
