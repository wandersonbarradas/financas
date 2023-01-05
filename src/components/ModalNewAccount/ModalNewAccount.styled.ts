import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
};
export const Container = styled.div<Props>`
    width: 100%;
    max-width: 430px;
    padding: 16px 26px;
    z-index: 30;
    border-radius: 16px;
    background-color: ${(props) => props.Theme.colorComponents};
    border: solid 1px ${(props) => props.Theme.colorBorder};
    max-height: 100vh;

    .headerModalAccount {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h3 {
            color: ${(props) => props.Theme.colorTitle};
            margin: 0;
            font-weight: 500;
            font-size: 20px;
        }
    }

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${(props) => props.Theme.colorOpacity};
        cursor: pointer;
    }

    .bodyModalAccount {
        transition: all 0.3s ease;
        overflow: hidden;
        padding: 0 10px;

        .inputArea {
            width: 100%;
            display: flex;
            padding-bottom: 5px;
            transition: border-bottom-color 200ms ease-in-out;
            border-radius: 1px;
            margin-top: 20px;
            position: relative;

            &:hover {
                &::before {
                    border-bottom: 2px solid
                        ${(props) => props.Theme.colorOpacity};
                }
            }

            &.focus {
                &::before {
                    border-bottom: 2px solid
                        ${(props) => props.Theme.colorPrimary};
                }
            }

            &.value {
                span {
                    margin: 0 5px 0 0;
                    font-size: 25px;
                    font-weight: 400;
                    color: ${(props) => props.Theme.colorPrimary};
                }
                input {
                    border: 0;
                    outline: 0;
                    background-color: transparent;
                    color: ${(props) => props.Theme.colorPrimary};
                    font-weight: 400;
                    font-size: 25px;
                    position: relative;

                    &::placeholder {
                        color: ${(props) => props.Theme.colorPrimary};
                    }
                }
            }

            &.institution {
                cursor: pointer;
                .boxImg {
                    width: 30px;
                    height: 30px;

                    img {
                        border-radius: 50%;
                        width: 100%;
                    }
                }
                .selectInstitution {
                    flex: 1;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-left: 25px;
                    color: ${(props) => props.Theme.colorTitle};
                }
            }

            &.description {
                input {
                    font-family: "Poppins", sans-serif;
                    width: 100%;
                    margin-left: 25px;
                    background-color: transparent;
                    outline: 0;
                    border: 0;
                    font-weight: 400;
                    font-size: 16px;
                    color: ${(props) => props.Theme.colorTitle};
                }
            }

            &::before {
                left: 0;
                right: 0;
                bottom: 0;
                content: "";
                position: absolute;
                transition: border-bottom-color 200ms ease-in-out;
                border-bottom: 1px solid ${(props) => props.Theme.colorOpacity};
                pointer-events: none;
            }
        }

        .inputAreaColor {
            margin-top: 20px;
            label {
                display: flex;
                align-items: center;
                gap: 25px;
                font-size: 16px;
                font-weight: 500;
                color: ${(props) => props.Theme.colorOpacity};
                cursor: pointer !important;
            }

            .boxColorAccount {
                overflow: hidden;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                position: relative;
                border: solid 2px ${(props) => props.Theme.colorBorder};
                input {
                    width: 100px;
                    height: 100px;
                    border: 0;
                    outline: 0;
                    position: absolute;
                    left: -20px;
                    top: -20px;
                    cursor: pointer;
                }
            }
        }
    }

    .footerModalAccount {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 26px 0 10px 0;
        gap: 20px;

        button {
            font-family: "Poppins", sans-serif;
            padding: 8px 22px;
            background-color: ${(props) => props.Theme.colorPrimary};
            border-radius: 25px;
            font-size: 16px;
            min-width: 175px;
            outline: 0;
            border: 0;
            color: #ffffff;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;

            &:disabled {
                background-color: ${(props) => props.Theme.colorBorder};
                color: ${(props) => props.Theme.colorOpacity};
            }
        }
    }
`;

type PropsModal = {
    opacity: number;
};

export const ContainerModal = styled.div<PropsModal>`
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: ${(props) => props.opacity};
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    display: flex;
    justify-content: center;
    align-items: center;
`;
