import { display } from "@mui/system";
import styled from "styled-components";

type Props = {
    colorTitle: string;
    colorPrimary: string;
    maxWidth: string;
};

export const Container = styled.div<Props>`
    max-width: ${(p) => p.maxWidth};
    padding: 6px 12px;
    border: solid 1px ${(props) => props.colorPrimary};
    border-radius: 20px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.colorTitle};
    font-size: 0.8125rem;

    p {
        margin: 0 0.8rem 0 0;
    }

    .icon {
        padding: 1px;
        background-color: ${(props) => props.colorPrimary};
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 !important;
        cursor: pointer;

        &:hover {
            opacity: 0.8;
        }
    }
`;
