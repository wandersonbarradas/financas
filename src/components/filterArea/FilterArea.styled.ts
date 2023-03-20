import { display } from "@mui/system";
import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
    Right: number;
    Opacity: number;
};
export const Container = styled.div<Props>`
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, ${(p) => p.Opacity});
    transition: all 0.25s ease;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 1000;

    .filterArea {
        position: absolute;
        right: ${(p) => p.Right}px;
        transition: all 0.25s ease;
        width: 450px;
        height: 100vh;
        background-color: ${(props) => props.Theme.colorComponents};
        border: 1px solid ${(props) => props.Theme.colorBorder};
        border-radius: 2rem 0 0 2rem;
        display: flex;
        flex-direction: column;

        .headerFilterArea {
            display: flex;
            align-items: center;
            padding: 20px 40px;
            border-bottom: 1px solid ${(p) => p.Theme.colorBorder};

            h3 {
                color: ${(p) => p.Theme.colorTitle};
                font-size: 1.25rem;
                font-weight: 500;
                margin: 0;
            }

            .iconMore {
                display: none;
                color: ${(p) => p.Theme.colorTitle};
            }
        }

        .fields {
            padding: 20px 40px;
            overflow-y: auto;
            flex: 1;
            position: relative;

            .containerListItems {
                position: absolute;
                background-color: ${(props) => props.Theme.colorComponents};
                border-radius: 1.5rem;
                z-index: 100;
                width: 100%;
                top: 80px;
            }

            .filterSelectedItems {
                div {
                    //max-width: 100%;
                    margin-bottom: 0.5rem;
                }
            }
        }

        .field {
            position: relative;
            margin-bottom: 1.5rem;
            label {
                color: ${(p) => p.Theme.colorTitle};
                font-weight: 300;
                font-size: 0.75rem;
            }

            .fieldInput {
                margin-top: 5px;
                display: flex;
                justify-content: flex-start;
                align-items: center;

                & > div:last-child {
                    display: flex;
                }

                input {
                    width: 75%;
                    background-color: transparent;
                    border: 0;
                    outline: 0;
                    color: ${(p) => p.Theme.colorTitle};
                    margin: 0 0 0 0.5rem;
                    font-size: 1rem;
                }

                .fieldIcon {
                    position: absolute;
                    right: 0;
                    top: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    color: ${(p) => p.Theme.colorOpacity};
                    width: 32px;
                    height: 32px;
                    transition: all 0.25s ease;

                    &:hover {
                        background-color: ${(props) => props.Theme.colorBorder};
                        border-radius: 50%;
                    }

                    &.active {
                        transform: rotate(180deg);
                    }
                }
            }

            &::after {
                content: "";
                position: absolute;
                bottom: -5px;
                left: 0;
                right: 0;
                width: 100%;
                height: 1px;
                background-color: ${(props) => props.Theme.colorTitle};
                transition: all 0.25s ease;
            }

            &:hover::after {
                height: 2px;
            }

            &.focus {
                &::after {
                    background-color: ${(props) => props.Theme.colorPrimary};
                    height: 2px;
                }

                label {
                    color: ${(props) => props.Theme.colorPrimary};
                }
            }
        }

        .fieldDate {
            display: flex;
            gap: 1.5rem;

            input::placeholder {
                color: ${(props) => props.Theme.colorTitle};
            }
        }

        .filtersActions {
            border-top: 1px solid ${(i) => i.Theme.colorBorder};
            background-color: ${(props) => props.Theme.colorComponents};
            display: flex;
            padding: 30px 40px;
            justify-content: space-between;

            .filtersBtn {
                border-radius: 1.5rem;
                padding: 0.6rem;
                outline: 0;
                text-transform: uppercase;
                background-color: transparent;
                border: 0;
                color: ${(p) => p.Theme.colorPrimary};
                font-weight: 500;
                font-family: "Poppins", sans-serif;
                cursor: pointer;
                transition: all 0.25s ease;

                &:last-child {
                    background-color: ${(p) => p.Theme.colorPrimary};
                    color: ${(p) => p.Theme.colorTitle};

                    &:hover {
                        background-color: ${(p) => p.Theme.colorSecundary};
                    }
                }

                &:first-child {
                    &:hover {
                        background-color: rgba(76, 73, 237, 0.2);
                    }
                }
            }
        }
    }

    @media screen and (max-width: 576px) {
        .filterArea {
            width: 100%;
            border-radius: 0;

            .headerFilterArea {
                padding: 1rem;

                h3 {
                    margin-left: 1.25rem;
                }

                .iconMore {
                    display: flex;
                }
            }

            .fields {
                padding: 1.5rem;
            }
        }
    }
`;
