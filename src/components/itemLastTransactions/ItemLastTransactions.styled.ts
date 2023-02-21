import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";
type Props = {
    colorValue: string;
    Theme: ThemeValues;
    colorCategory: string;
};

export const Container = styled.li<Props>`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 0.625rem;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${(props) => props.Theme.colorBorder};
    }

    .profile {
        background-color: ${(props) => props.colorCategory};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-right: 0.5rem;
    }

    .box-info {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title-transaction {
            color: ${(props) => props.Theme.colorTitle};
            margin: 0;
            font-style: normal;
            font-weight: 400;
            font-size: 1rem;
            line-height: 1.3125rem;
            letter-spacing: -0.02em;
        }

        .categorie-transaction {
            font-weight: 400;
            font-size: 0.875rem;
            line-height: 1.125rem;
            letter-spacing: -0.02em;
            margin: 0;
            color: ${(props) => props.Theme.colorOpacity};
        }

        .value {
            white-space: nowrap;
            font-weight: 400;
            font-size: 1rem;
            line-height: 1.4375rem;
            text-align: right;
            letter-spacing: -0.02em;
            color: ${(props) => props.colorValue};
        }
    }
`;
