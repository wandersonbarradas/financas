import { UserAccountType } from "../../types/AccountsType";
import { NormalTansactionType } from "../../types/TransactionType";
import { CategoryType, SubCategories } from "../../types/UserType";
import * as C from "./ModalExpenseCatItem.styled";
import { useContext } from "react";
import { Context } from "../../context/context";

type Props = {
    category?: CategoryType;
    subcategory?: SubCategories;
    account?: UserAccountType;
    filterItem?: { name: string; color: string };
};

export const ModalExpenseCatItem = ({
    category,
    subcategory,
    account,
    filterItem,
}: Props) => {
    const { state } = useContext(Context);
    if (category && !subcategory) {
        return (
            <C.Container
                maxWidth="250px"
                colorTitle={state.theme.theme.colorTitle}
                colorPrimary={category.color}
            >
                <p className="text-nowrap">{category.name}</p>
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
