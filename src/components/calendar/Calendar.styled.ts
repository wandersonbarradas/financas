import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
};
export const Container = styled.div<Props>`
    .calendar {
        background-color: ${(props) => props.Theme.colorComponents};
        border-radius: 25px;

        .rdrMonthPicker select,
        .rdrYearPicker select {
            color: ${(props) => props.Theme.colorTitle};
            option {
                background-color: ${(props) => props.Theme.colorContainer};
            }
        }

        .rdrDay {
            .rdrDayNumber span {
                color: ${(props) => props.Theme.colorTitle};
            }
            &.rdrDayPassive {
                .rdrDayNumber span {
                    color: ${(props) => props.Theme.colorOpacity};
                }
            }
        }
    }

    @media screen and (max-width: 576px) {
        position: absolute;
        top: 100px;
    }
`;
