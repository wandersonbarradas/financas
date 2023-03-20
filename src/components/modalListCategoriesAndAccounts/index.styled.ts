import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
    Height: number;
};

export const Container = styled.div<Props>`
    padding: 12px 0;
    width: 100%;
    max-width: 400px;
    max-height: ${(p) => p.Height}px;
    overflow-y: auto;
    background-color: ${(props) => props.Theme.colorComponents};
    border: 1px solid ${(props) => props.Theme.colorBorder};
    border-radius: 12px;
`;

type PropsAccount = {
    Theme: ThemeValues;
};

export const AccountItem = styled.div<PropsAccount>`
    width: 100%;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;

    img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
    }

    span {
        color: ${(props) => props.Theme.colorTitle};
        margin-left: 10px;
    }

    &:hover {
        background-color: ${(props) => props.Theme.colorBorder};
    }
`;

type PropsCategory = {
    Theme: ThemeValues;
    color: string;
};

export const CategoryItem = styled.div<PropsCategory>`
    width: 100%;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;

    .color {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-color: ${(props) => props.color};

        &.sub {
            width: 14px;
            height: 14px;
        }
    }

    .icon {
        color: ${(props) => props.Theme.colorOpacity};
        margin: 0 10px 0 1px;
    }

    span {
        color: ${(props) => props.Theme.colorTitle};
        margin-left: 10px;

        &.sub {
            font-size: 0.875rem;
        }
    }

    &:hover {
        background-color: ${(props) => props.Theme.colorBorder};
    }
`;
