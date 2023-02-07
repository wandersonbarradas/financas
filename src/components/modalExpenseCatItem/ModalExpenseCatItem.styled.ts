import styled from "styled-components";

type Props = {
    colorTitle: string;
    colorPrimary: string;
};

export const Container = styled.div<Props>`
    max-width: 250px;
    padding: 6px 12px;
    border: solid 1px ${(props) => props.colorPrimary};
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.colorTitle};
    font-size: 0.8125rem;
    margin-right: 5px;

    p {
        margin: 0;
    }
`;
