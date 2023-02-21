import styled from "styled-components";

type Props = {
    opacity: number;
    modalOpacity: number;
    align?: string;
    justifyContent?: string;
};

export const Container = styled.div<Props>`
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    min-height: 100vh;
    position: fixed;
    background-color: rgba(0, 0, 0, ${(props) => props.modalOpacity});
    opacity: ${(props) => props.opacity};
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    display: flex;
    justify-content: ${(i) => (i.justifyContent ? i.justifyContent : "center")};
    align-items: ${(i) => (i.align ? i.align : "center")};
    z-index: 1000;
`;
