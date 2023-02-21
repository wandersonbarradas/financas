import {
    NormalTansactionType,
    TransferTansactionType,
} from "./TransactionType";
export type reducerActionType = {
    type: string;
    payload: {
        [key: string]: any;
    };
};

export type GeneralType = {
    selectMonth: boolean;
    sideBar: boolean;
    loader: boolean;
    selectedTransactions: NormalTansactionType | null;
};
