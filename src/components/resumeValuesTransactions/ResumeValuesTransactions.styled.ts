import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
    sideBar: boolean;
};
export const Container = styled.div<Props>`
    .bottomLine {
        display: grid;
        gap: 0.625rem;
        align-items: stretch;
        grid-template-columns: repeat(4, 1fr);

        &.filtered {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    .bottomLineMobile {
        display: none;
        justify-content: space-between;
        background-color: ${(i) => i.Theme.colorComponents};
        border-radius: 2rem 2rem 0 0;
        padding: 1.43rem;
        border-bottom: 2px solid ${(i) => i.Theme.colorBorder};

        .resumeItem {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 1rem;
            color: ${(i) => i.Theme.colorTitle};

            .boxIcon {
                font-size: 1.25rem;
            }

            .value {
                &.less {
                    color: ${(i) => i.Theme.expenseColor};
                }
                &.more {
                    color: ${(i) => i.Theme.incomeColor};
                }
            }
        }
    }

    @media screen and (max-width: 1300px) {
        .bottomLine {
            display: grid;
            grid-template-columns: ${(i) =>
                i.sideBar ? "repeat(2, 1fr)" : "repeat(4, 1fr)"};
        }
    }
    @media screen and (max-width: 1140px) {
        .bottomLine {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media screen and (max-width: 875px) {
        .bottomLine.filtered {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media screen and (max-width: 576px) {
        .bottomLine {
            display: none;
        }
        .bottomLineMobile {
            display: flex;
        }
    }
`;
