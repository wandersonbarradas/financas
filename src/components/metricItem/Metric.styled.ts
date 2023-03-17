import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";
type PropsContainer = {
    Theme: ThemeValues;
    bgIcon: string;
};

export const Container = styled.div<PropsContainer>`
    background-color: ${(props) => props.Theme.colorComponents};
    padding: 16px;
    border-radius: 12px;
    display: flex;
    gap: 14px;
    transition: all 0.3s ease;
    border: 1px solid ${(props) => props.Theme.colorBorder};

    .values {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .boxIcon {
        padding: 1rem;
        display: flex;
        justify-content: center;
        border-radius: 50%;
        align-items: center;
        background-color: ${(i) => i.bgIcon};
        color: ${(i) => i.Theme.colorTitle};
    }

    .title {
        font-weight: 600;
        font-size: 1rem;
        line-height: 20px;
        color: ${(props) => props.Theme.colorOpacity};
        transition: all 0.3s ease;
    }

    .value {
        font-family: "Inter", sans-serif;
        font-weight: 600;
        font-size: 1.35rem;
        line-height: 28px;
        color: ${(props) => props.Theme.colorTitle};
        transition: all 0.3s ease;
        width: 138px;
    }

    /* @media screen and (max-width: 576px) {
        .title {
            font-size: 14px;
        }

        .value {
            font-size: 16px;
        }
    } */
`;
