import * as C from "./index.styled";
import { useContext } from "react";
import { Context } from "../../context/context";
import { CategoryType, SubCategories } from "../../types/UserType";
import { UserAccountType } from "../../types/AccountsType";
import SubdirectoryArrowRightOutlinedIcon from "@mui/icons-material/SubdirectoryArrowRightOutlined";

type Props = {
    subcategories?: SubCategories[] | null;
    categories?: CategoryType[] | null;
    accounts?: UserAccountType[] | null;
    height: number;
    OnClick?: any;
};

export const ListCategoriesAndAccounts = (props: Props) => {
    const { state } = useContext(Context);
    return (
        <C.Container
            Height={props.height}
            className="scroll"
            Theme={state.theme.theme}
        >
            {props.accounts?.map((item, index) => (
                <C.AccountItem
                    key={index}
                    onClick={() => props.OnClick(item)}
                    Theme={state.theme.theme}
                >
                    <img src={item.account.imgUrl} alt="" />
                    <span>{item.description}</span>
                </C.AccountItem>
            ))}
            {props.categories?.map((item, index) => (
                <>
                    <C.CategoryItem
                        key={index}
                        onClick={() => props.OnClick(item)}
                        color={item.color}
                        Theme={state.theme.theme}
                    >
                        <div className="color"></div>
                        <span>{item.name}</span>
                    </C.CategoryItem>
                    {props.subcategories
                        ?.filter((i) => i.category === item.id)
                        .map((e, ei) => (
                            <C.CategoryItem
                                key={index * ei + index}
                                onClick={() => props.OnClick(e)}
                                color={e.color}
                                Theme={state.theme.theme}
                            >
                                <div className="icon">
                                    <SubdirectoryArrowRightOutlinedIcon fontSize="medium" />
                                </div>
                                <div className="color sub"></div>
                                <span className="sub">{e.name}</span>
                            </C.CategoryItem>
                        ))}
                </>
            ))}
        </C.Container>
    );
};
