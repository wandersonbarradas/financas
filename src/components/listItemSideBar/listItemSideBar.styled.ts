import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";
type Props = {
    menuOpen: boolean;
    Theme: ThemeValues;
};

export const Container = styled.li<Props>`
    list-style: none;

    .link-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-decoration: none;
        padding: 8px 0;
        color: ${(props) => props.Theme.colorOpacity};
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
        transition: all 0.3s ease;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-radius: 4px;
        cursor: pointer;

        &.activeLinkNavBar,
        &:hover {
            color: #fff;
            background-color: ${(props) => props.Theme.colorPrimary};
        }

        .box-icon {
            width: 56px;
            min-width: 56px;
            display: flex;
            align-items: center;
            justify-content: center;

            svg {
                margin-left: -6px;
            }
        }
    }
`;
