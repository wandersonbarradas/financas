import { display } from "@mui/system";
import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
    inputSearch: boolean;
    colorType: string;
    ColorDelete: string;
    position: { left: number; top: number };
};

export const Container = styled.div<Props>`
    padding: 24px 24px 60px 24px;
    overflow-x: hidden;
    max-width: 1440px;
    margin: 0 auto;

    .header {
        width: 100%;
        padding: 50px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .leftSide,
        .rightSide {
            flex: 1;
        }

        .leftSide {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .type {
                background-color: ${(props) => props.colorType};
                color: #ffffff;
                height: 48px;
                padding: 15px;
                font-weight: 500;
                border-radius: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                gap: 5px;
                transition: all 0.3s ease;

                &:hover {
                }
            }
        }
        .rightSide {
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
        .boxOptions {
            display: flex;
            gap: 12px;
            align-items: center;

            .btn {
                border-radius: 50%;
                width: 48px;
                height: 48px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: ${(props) => props.Theme.colorComponents};
                border: 1px solid ${(props) => props.Theme.colorBorder};
                outline: 0;
                color: ${(props) => props.Theme.colorOpacity};
                transition: all 0.3s ease;
                cursor: pointer;

                &:hover {
                    background-color: ${(props) => props.Theme.colorBorder};
                }

                &.btn-search {
                    width: ${(props) => (props.inputSearch ? 300 : 48)}px;
                    border-radius: 48px;
                    padding: 10px;
                    position: relative;
                    overflow: hidden;

                    input {
                        position: absolute;
                        left: ${(props) =>
                            props.inputSearch ? "10px" : "50px"};
                        display: block;
                        width: 250px;
                        background-color: transparent;
                        border: 0;
                        outline: 0;
                        height: 100%;
                        color: ${(props) => props.Theme.colorTitle};
                        font-size: 16px;
                        opacity: ${(props) => (props.inputSearch ? "1" : "0")};
                        transition: all 0.3s ease;
                        transition: opacity 0.5s ease-in-out;
                    }

                    svg {
                        background-color: inherit;
                        position: absolute;
                        right: 10px;
                    }
                }
            }
        }
    }

    .body {
        width: 100%;
        background-color: ${(props) => props.Theme.colorComponents};
        border-radius: 12px;
        overflow-x: hidden;
        border: 1px solid ${(props) => props.Theme.colorBorder};
        box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
            0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
        margin-bottom: 20px;

        .tableTransactions {
            width: 100%;
            border-spacing: 0;
            padding-bottom: 20px;
            transition: all 0.3s ease;
        }

        thead {
            background-color: ${(props) => props.Theme.colorBorder};
        }

        th {
            padding: 15px;
            text-align: start;
            color: ${(props) => props.Theme.colorTitle};
            border-bottom: 1px solid ${(props) => props.Theme.colorBorder};
            font-weight: 400;
            font-size: 14px;
            &:last-child {
                padding-right: 20px;
            }
            &:first-child {
                padding-left: 20px;
            }
            transition: all 0.3s ease;
        }

        .tableMobile {
            display: none;
            padding: 16px 0;
            .listMobile {
                display: flex;
                flex-direction: column;
                list-style: none;
                margin: 0;
                padding: 0;

                .dateTransactionMobile {
                    margin: 0 0 5px 20px;
                    color: ${(i) => i.Theme.colorTitle};
                    font-size: 1rem;
                }
            }
        }
    }

    .containerToggle {
        position: absolute;
        top: ${(props) => props.position.top}px;
        left: ${(props) => props.position.left}px;
        background-color: ${(props) => props.Theme.colorComponents};
        padding: 10px 0;
        border-radius: 12px;

        .listTypes {
            padding: 0;
            margin: 0;
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 2px;

            .listTypeItem {
                padding: 5px 12px;
                display: flex;
                gap: 12px;
                align-items: center;
                color: ${(props) => props.Theme.colorTitle};
                transition: all 0.3s ease;
                cursor: pointer;

                span {
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    &.tr {
                        background-color: ${(props) =>
                            props.Theme.colorPrimary};
                    }
                    &.ex {
                        background-color: ${(props) =>
                            props.Theme.expenseColor};
                    }
                    &.in {
                        background-color: ${(props) => props.Theme.incomeColor};
                    }
                    &.tra {
                        background-color: ${(props) =>
                            props.Theme.transferColor};
                    }
                }

                &:hover {
                    background-color: ${(props) => props.Theme.colorBorder};
                }
            }
        }
    }

    .boxModalTransaction {
        height: auto;
        width: 100%;
        max-width: 500px;
        display: flex;
        justify-content: center;
        align-items: center;

        .headerBox {
            display: none;
        }

        .modalDeleteMobile {
            width: 70%;
            background-color: ${(i) => i.Theme.colorBorder};
            padding: 16px;
            border-radius: 16px;

            .title {
                font-size: 1rem;
                margin: 0 0 16px 0;
                color: ${(i) => i.Theme.colorTitle};
            }

            .boxModalBtn {
                display: flex;
                justify-content: flex-end;

                .btn {
                    background-color: transparent;
                    border: 0;
                    outline: 0;
                    color: ${(i) => i.ColorDelete};
                    font-family: "Poppins", sans-serif;
                    margin-left: 16px;
                }
            }
        }
    }

    @media screen and (max-width: 780px) {
        height: 85vh;
        display: flex;
        flex-direction: column;
        padding: 12px 0px 0px 0px;
        .header {
            padding: 50px 16px;
        }
        .body {
            flex: 1;
            margin: 0;
            border-radius: 32px 32px 0 0;
            .tableTransactions {
                display: none;
            }
            .tableMobile {
                display: block;
                color: ${(i) => i.colorType};
            }
        }
    }

    @media screen and (max-width: 576px) {
        .boxModalTransaction {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            height: 100vh;
            max-width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: start;
            background-color: ${(props) => props.Theme.colorSideBar};

            .headerBox {
                padding: 20px 20px 80px 20px;
                display: flex;
                align-items: center;
                width: 100%;

                .titleTransaction {
                    margin: 0;
                    flex: 1;
                    font-size: 1.25rem;
                    font-weight: 500;
                    color: ${(i) => i.Theme.colorTitle};
                }

                .icon {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: ${(i) => i.Theme.colorTitle};
                    margin-right: 15px;
                }
            }
        }
    }
`;

type PropsModalDelete = {
    Theme: ThemeValues;
    Color: string;
};

export const ContainerModalDelete = styled.div<PropsModalDelete>`
    padding: 16px 26px;
    background-color: ${(props) => props.Theme.colorComponents};
    border: 1px solid ${(props) => props.Theme.colorComponents};
    border-radius: 12px;
    width: 550px;
    z-index: 99;

    h3 {
        font-size: 22px;
        margin: 0 0 20px 0;
        color: ${(props) => props.Theme.colorTitle};
        font-weight: 500;
    }

    .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;

        .title {
            font-weight: 600;
            color: ${(props) => props.Theme.colorOpacity};
            margin: 0;
            font-size: 14px;
        }

        span {
            color: ${(props) => props.Theme.colorOpacity};
            font-size: 14px;
        }
    }

    .btnArea {
        margin-top: 20px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .btn {
            padding: 6px 20px;
            border-radius: 20px;
            outline: 0;
            border: 1px solid ${(props) => props.Color};
            background-color: transparent;
            color: ${(props) => props.Theme.colorTitle};
            font-family: "Poppins", sans-serif;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.15s ease;

            &.deletar {
                background-color: ${(props) => props.Color};
                &:hover {
                    opacity: 0.8;
                }
            }

            &.cancelar {
                opacity: 0.8;
                &:hover {
                    opacity: 1;
                }
            }
        }
    }
`;
