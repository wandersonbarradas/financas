import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
};

export const Container = styled.div<Props>`
    .top-metrics {
        display: flex;
        flex-direction: column;
        gap: 37px;
    }
    .row {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
        align-items: stretch;

        .balance,
        .report {
            background-color: ${(props) => props.Theme.colorComponents};
            border-radius: 20px;
            height: 230px;
            transition: all 0.3s ease;
            border: 1px solid #3C3C3C;
        }

        .balance {
            display: flex;
            /* gap: 20px; */
            align-items: center;
            justify-content: space-around;
            overflow: hidden;
            position: relative;
        }

        .balance-summary {
            margin-left: 20px;
            flex: 1;
        }

        .balance-title {
            margin: 0 0 13px 0;
            font-size: 20px;
            font-weight: 900;
            color: ${(props) => props.Theme.colorTitle};
        }

        .last-transaction-value {
            font-family: "Inter", sans-serif;
            color: #4fd18b;
            font-size: 18px;
            margin-bottom: 7px;
        }

        .balance-text-info {
            font-size: 12px;
            font-weight: 700;
            color: ${(props) => props.Theme.colorOpacity};
            margin-bottom: 13px;
        }

        .balance-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;

            .btn {
                width: 100px;
                height: 48px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 46px;
                border: 1px solid ${(props) => props.Theme.colorPrimary};
                font-weight: 900;
                font-size: 11px;
                line-height: 16px;
                letter-spacing: 0.04em;
                transition: all 0.3s ease;
                cursor: pointer;
            }

            .btn:nth-child(1) {
                background-color: ${(props) => props.Theme.colorPrimary};
                color: #fff;

                &:hover {
                    background-color: transparent;
                    color: ${(props) => props.Theme.colorPrimary};
                }
            }

            .btn:nth-child(2) {
                background-color: transparent;
                color: #4c49ed;

                &:hover {
                    background-color: #4c49ed;
                    color: #fff;
                }
            }
        }

        .balance-total {
            flex: 1;
            max-width: 250px;
            height: 300px;
            background-color: ${(props) => props.Theme.colorPrimary};
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 100% 0 0 100%;
            padding: 20px;

            .info {
                font-weight: 900;
                font-size: 9px;
                letter-spacing: 0.17em;
                color: #ffffff;
                opacity: 0.5;
                text-align: center;
            }
        }

        .balance-value {
            font-family: "Inter", sans-serif;
            font-weight: 800;
            font-size: 25px;
            color: #ffffff;

            span {
                font-size: 16px;
                color: rgba(255, 255, 255, 0.31);
            }
        }

        .report {
            padding: 15px;
            div {
                height: 100%;
            }
            canvas {
                max-height: 100%;
                min-height: 100%;
                width: 100% !important;
            }
        }

        &.metric {
            gap: 30px;
            display: grid;
            grid
            gap: 30px;
            align-items: stretch;
            grid-template-columns: repeat(4, 1fr);
        }

        .last-transactions,
        .chart-pie {
            background-color: ${(props) => props.Theme.colorComponents};
            border-radius: 20px;
            box-shadow: 8px 13px 44px -6px ${(props) =>
                props.Theme.colorComponents};
            padding: 24px 25px;
            border-radius: 16px;
            transition: all 0.3s ease;

            .header {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 20px;
                color: ${(props) => props.Theme.colorTitle};

                .title {
                    margin: 0;
                    font-weight: 900;
                    line-height: 25px;
                    letter-spacing: -0.02em;
                }

                .icon {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: ${(props) => props.Theme.colorOpacity};
                    cursor: pointer;
                }
            }
        }

        .content {
            padding: 0;
            margin: 24px 0 0 0;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
    }

    .bottom-metrics {
        margin-top: 37px;

        .row {
        }

        .chart-pie {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 34px;
            canvas {
                width: auto !important;
                max-height: 324px; 
            }
           
        }
    }

    @media screen and (max-width: 1090px) {
        .row {
            flex-direction: column;
            grid-template-columns: repeat(1, 1fr);
            .balance-total {
                align-items: center;
            }
        }

        .row {
            &.metric {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        } 
        }
    }
`;
