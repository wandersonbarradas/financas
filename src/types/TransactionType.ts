import { UserAccountType } from "./AccountsType";
import { CategoryType, SubCategories } from "./UserType";

export type NormalTansactionType = {
    type: "expense" | "income" | "transfer";
    id: number;
    value: number;
    date: Date | { seconds: number; nanoseconds: number };
    description: string;
    category: CategoryType;
    subcategory: SubCategories | null;
    account: UserAccountType;
    done: boolean;
};

export type TransferTansactionType = {
    type: "transfer";
    id: number;
    value: number;
    date: Date | { seconds: number; nanoseconds: number };
    description: string;
    account: UserAccountType;
    accountFor: UserAccountType;
    done: boolean;
};
