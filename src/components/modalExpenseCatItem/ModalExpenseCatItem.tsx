import { UserAccountType } from "../../types/AccountsType";
import { CategoryType, SubCategories } from "../../types/UserType";
import * as C from "./ModalExpenseCatItem.styled";
import { useContext } from "react";
import { Context } from "../../context/context";
import CloseIcon from "@mui/icons-material/CloseOutlined";

type Props = {
    category?: CategoryType;
    subcategory?: SubCategories;
    account?: UserAccountType;
    filterItem?: { name: string; color: string };
    removeItem?: (
        type: "category" | "subcategory" | "account",
        item: CategoryType | SubCategories | UserAccountType,
    ) => void;
};

export const ModalExpenseCatItem = ({
    category,
    subcategory,
    account,
    filterItem,
    removeItem,
}: Props) => {
    const { state } = useContext(Context);

    const remove = (type: "category" | "subcategory" | "account") => {
        if (!removeItem) {
            return;
        }
        if (type === "account" && account) {
            removeItem("account", account);
        } else if (type === "category" && category) {
            removeItem("category", category);
        } else if (type === "subcategory" && subcategory) {
            removeItem("subcategory", subcategory);
        }
    };

    if (category && !subcategory) {
        return (
            <C.Container
                maxWidth="250px"
                colorTitle={state.theme.theme.colorTitle}
                colorPrimary={category.color}
            >
                <p className="text-nowrap">{category.name}</p>
                {removeItem && (
                    <div onClick={() => remove("category")} className="icon">
                        <CloseIcon fontSize="small" />
                    </div>
                )}
            </C.Container>
        );
    } else if (category && subcategory) {
        return (
            <C.Container
                maxWidth="250px"
                colorTitle={state.theme.theme.colorTitle}
                colorPrimary={category.color}
            >
                <p className="text-nowrap">
                    {category.name + " > " + subcategory.name}
                </p>
                {removeItem && (
                    <div onClick={() => remove("subcategory")} className="icon">
                        <CloseIcon fontSize="small" />
                    </div>
                )}
            </C.Container>
        );
    } else if (account) {
        return (
            <C.Container
                maxWidth="250px"
                colorTitle={state.theme.theme.colorTitle}
                colorPrimary={account.color}
            >
                <p className="text-nowrap">{account.description}</p>
                {removeItem && (
                    <div onClick={() => remove("account")} className="icon">
                        <CloseIcon fontSize="small" />
                    </div>
                )}
            </C.Container>
        );
    } else if (filterItem) {
        return (
            <C.Container
                maxWidth="auto"
                colorTitle={state.theme.theme.colorTitle}
                colorPrimary={filterItem.color}
            >
                <p className="text-nowrap">{filterItem.name}</p>
            </C.Container>
        );
    } else {
        return <></>;
    }
};
