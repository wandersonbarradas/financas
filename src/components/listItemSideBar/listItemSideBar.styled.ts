import { display } from "@mui/system";
import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";
type Props = {
    menuOpen: boolean;
    Theme: ThemeValues;
};

export const Container = styled.li<Props>`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;

    .link-item {
        flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-decoration: none;
        padding: 8px 0;
        color: ${(props) => props.Theme.colorOpacity};
        font-weight: 500;
        font-size: 1rem;
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

    @media screen and (max-width: 992px) {
        flex: 1;

        .link-item {
            flex-direction: column;
            justify-content: center;
            padding: 8px 4px;
            font-weight: 400;
            overflow: visible;

            &.activeLinkNavBar,
            &:hover {
                color: ${(props) => props.Theme.colorPrimary};
                background-color: transparent;
            }

            .box-icon {
                width: auto;
                min-width: auto;

                svg {
                    margin-left: 0;
                }
            }
        }
    }

    @media screen and (max-width: 700px) {
        &.invoice,
        &.report {
            display: none;
        }
    }

    /* @media screen and (max-width: 460px) {
        .link-item {
            font-size: 12px;
        }
    } */
`;
