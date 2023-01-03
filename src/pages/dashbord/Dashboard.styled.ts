import { display } from "@mui/system";
import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
    Menu: boolean;
};

export const Container = styled.div<Props>`
    padding: 24px 24px 60px 24px;
    max-width: 1440px;
    margin: 0 auto;
    
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
                display: flex;
                align-items: center;
                gap: 5px;
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 7px;

                &.po {
                    color: ${(props) => props.Theme.incomeColor}
                }
                &.ne {
                    color: ${(props) => props.Theme.expenseColor}
                }
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
                transition: all 0.3s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-radius: 100% 0 0 100%;
                padding: 20px 6px 20px 20px;

                &.po {
                    background: ${(props) => props.Theme.gradientPositive}
                }
                &.ne {
                    background: ${(props) => props.Theme.gradientNegative}
                }

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
                    font-size: 22px;
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
            flex: 1;
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

            .chartPie {
                width: 100% !important;
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
            align-self: flex-start;
            padding-bottom: 48px;
            gap: 34px;
            canvas {
                width: auto !important;
                max-height: 324px; 
            }
           
        }
    }

    @media screen and (max-width: 1090px) {
        .response {
            flex-direction: column;
            grid-template-columns: repeat(1, 1fr);
            .balance-total {
                align-items: center;
            }
        }

        .response {
            &.metric {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
            } 
        }
    }

    @media screen and (max-width: 900px) {
        .row:not(.response) {
            flex-direction: column;
            grid-template-columns: repeat(1, 1fr);
            .balance-total {
                align-items: center;
            }

            &.metric {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
            } 
        }  
    }

     @media screen and (max-width: 576px) {
        .row {
            .balance-title {
                font-size: 20px;
            }
            .last-transaction-value {
                font-size: 18px;

                svg {
                    font-size: 1.3rem;
                }
            }
            .balance-text-info {
                font-size: 12px;
            }
            .balance-value {
                font-size: 20px;
            }

        .last-transactions,
        .chart-pie {
                .title {
                    font-size: 18px;
                }
        }
        
     }

`;
