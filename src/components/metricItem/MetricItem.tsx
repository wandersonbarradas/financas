import * as C from "./Metric.styled";
import { Context } from "../../context/context";
import { useContext } from "react";
import Formatted from "../../helpers/FormattedPrice";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

type Props = {
    title: string;
    value: number;
    Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
    bgIcon?: string;
};

export const MetricItem = ({ title, value, Icon, bgIcon }: Props) => {
    const [valor, decimais] = Formatted.format(value).split(",");
    const { state } = useContext(Context);

    return (
        <C.Container Theme={state.theme.theme} bgIcon={bgIcon ?? "transparent"}>
            <div className="values">
                <span className="title text-nowrap">{title}</span>
                <div className="value text-nowrap">
                    {valor}
                    <small>,{decimais}</small>
                </div>
            </div>
            {Icon && (
                <div className="boxIcon">
                    <Icon />
                </div>
            )}
        </C.Container>
    );
};
