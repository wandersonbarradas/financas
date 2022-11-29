import styled from "styled-components";

export const Container = styled.li`
    list-style: none;

    .link-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-decoration: none;
        padding: 14px 0;
        color: #a1a0bd;
        font-weight: 800;
        font-size: 17px;
        line-height: 21px;
        transition: all 0.3s ease;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;

        &.activeLinkNavBar,
        &:hover {
            color: #4c49ed;
            background-color: #e4e3ff;
        }

        .box-icon {
            min-width: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;
