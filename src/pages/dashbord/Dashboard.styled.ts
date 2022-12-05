import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
};

export const Container = styled.div<Props>`
    padding: 32px 24px 0 36px;
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
                border-radius: 12px;
                height: 230px;
                transition: all 0.3s ease;
                border: 1px solid ${(props) => props.Theme.colorBorder};
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
                margin-left: 36px;
                flex: 1;
            }

            .balance-title {
                margin: 0 0 13px 0;
                font-size: 25px;
                font-weight: 600;
                color: ${(props) => props.Theme.colorTitle};
                transition: all 0.3s ease;
            }

            .last-transaction-value {
                font-family: "Inter", sans-serif;
                color: #4fd18b;
                font-size: 18px;
                margin-bottom: 7px;
            }

            .balance-text-info {
                font-size: 14px;
                font-weight: 500;
                color: ${(props) => props.Theme.colorOpacity};
                margin-bottom: 13px;
                transition: all 0.3s ease;
            }
        

            .balance-total {
                flex: 1;
                max-width: 250px;
                height: 270px;
                background: ${(props) => props.Theme.gradientBalance};
                transition: all 0.3s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-radius: 100% 0 0 100%;
                padding: 20px 6px 20px 20px;

                .info {
                    font-weight: 900;
                    font-size: 10px;
                    letter-spacing: 0.17em;
                    color: ${(props) => props.Theme.colorTitle};
                    transition: all 0.3s ease;
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
                }
            }

            .report {
                display: flex;
                flex-direction: column;
                .report-title {
                    margin: 0;
                    color: ${(props) => props.Theme.colorTitle};
                    font-weight: 600;
                }

                padding: 15px;
                div {
                    flex: 1;
                    max-height: 180px;
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
                gap: 30px;
                align-items: stretch;
                grid-template-columns: repeat(4, 1fr);
            }
        }

        .last-transactions,
        .chart-pie {
            background-color: ${(props) => props.Theme.colorComponents};
            border-radius: 12px;
            padding: 24px 25px;
            transition: all 0.3s ease;
            border: 1px solid ${(props) => props.Theme.colorBorder};


            .header {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 20px;
                color: ${(props) => props.Theme.colorTitle};

                .title {
                    margin: 0;
                    font-weight: 600;
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
