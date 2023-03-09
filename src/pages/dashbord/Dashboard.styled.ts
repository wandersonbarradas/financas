import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
    Menu: boolean;
};

export const Container = styled.div<Props>`
    padding: 1.5rem;
    max-width: 1440px;
    margin: 0 auto;

    .top-metrics {
        display: flex;
        flex-direction: column;
        gap: 2.3125rem;
    }
    .row {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.875rem;
        align-items: stretch;

        .balance,
        .report {
            background-color: ${(props) => props.Theme.colorComponents};
            border-radius: 0.75rem;
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
            margin-left: 1rem;
            flex: 1;
        }

        .balance-title {
            margin: 0 0 0.8125rem 0;
            font-size: 1.5625rem;
            font-weight: 600;
            color: ${(props) => props.Theme.colorTitle};
            transition: all 0.3s ease;
        }

        .last-transaction-value {
            font-family: "Inter", sans-serif;
            display: flex;
            align-items: center;
            gap: 0.3125rem;
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.4375rem;

            &.po {
                color: ${(props) => props.Theme.incomeColor};
            }
            &.ne {
                color: ${(props) => props.Theme.expenseColor};
            }
        }

        .balance-text-info {
            font-size: 0.875rem;
            font-weight: 500;
            color: ${(props) => props.Theme.colorOpacity};
            margin-bottom: 0.8125rem;
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
            padding: 1.25rem 0.375rem 1.25rem 1.25rem;

            &.po {
                background: ${(props) => props.Theme.gradientPositive};
            }
            &.ne {
                background: ${(props) => props.Theme.gradientNegative};
            }

            .info {
                font-weight: 900;
                font-size: 0.625rem;
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
            font-size: 1.5625rem;
            color: #ffffff;
        }

        .report {
            display: flex;
            flex-direction: column;
            padding: 1rem;
            .report-title {
                margin: 0;
                color: ${(props) => props.Theme.colorTitle};
                font-weight: 600;
                font-size: 1.2rem;
            }
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
            display: grid;
            gap: 1.875rem;
            align-items: stretch;
            grid-template-columns: repeat(4, 1fr);
        }
    }

    .last-transactions,
    .chart-pie {
        flex: 1;
        background-color: ${(props) => props.Theme.colorComponents};
        border-radius: 0.75rem;
        padding: 1rem;
        transition: all 0.3s ease;
        border: 1px solid ${(props) => props.Theme.colorBorder};

        .header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 1.25rem;
            color: ${(props) => props.Theme.colorTitle};

            .title {
                margin: 0;
                font-weight: 600;
                line-height: 1.5625rem;
                letter-spacing: -0.02em;
            }
        }

        .chartPie {
            width: 100% !important;
        }
    }

    .content {
        padding: 0;
        margin: 1.5rem 0 0 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .bottom-metrics {
        margin-top: 2.3125rem;

        .row {
            align-items: start;
        }

        .chart-pie {
            display: flex;
            flex-direction: column;
            align-items: center;
            align-self: flex-start;
            padding-bottom: 3rem;
            gap: 2.125rem;
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

    @media screen and (max-width: 780px) {
        padding: 0.5rem 1rem 3.75rem 1rem;
    }
`;

type PropsMenuDrop = {
    Theme: ThemeValues;
    position: { top: number; left: number };
};
export const MenuDrop = styled.div<PropsMenuDrop>`
    position: absolute;
    top: ${(i) => i.position.top}px;
    left: ${(i) => i.position.left}px;
    background-color: ${(i) => i.Theme.colorComponents};
    border: 1px solid ${(i) => i.Theme.colorBorder};
    border-radius: 5rem;
    box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.75);
    ul {
        list-style: none;
        margin: 0;
        padding: 0;

        li {
            color: ${(i) => i.Theme.colorOpacity};
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 5rem;

            &:hover {
                background-color: ${(i) => i.Theme.colorBorder};
                cursor: pointer;
            }
        }
    }
`;
