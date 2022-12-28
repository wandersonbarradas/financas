import { UserAccountType } from "./AccountsType";
import {
    NormalTansactionType,
    TransferTansactionType,
} from "./TransactionType";
export type UserType = {
    data: DataType | null;
    categories: CategoryType[] | null;
    subcategories: SubCategories[] | null;
    transactions: NormalTansactionType[] | TransferTansactionType[];
    accounts: UserAccountType[] | null;
    selectedDate: Date;
};

export type DataType = {
    name: string;
    email: string;
    photo: string;
    id: string;
};

export type CategoryType = {
    color: string;
    id: number;
    name: string;
    type: "expense" | "income";
};

export type SubCategories = {
    category: number;
    id: number;
    color: string;
    name: string;
};
