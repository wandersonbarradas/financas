export type AccountType = {
    id: number;
    imgUrl: string;
    name: string;
    color: string;
};

export type UserAccountType = {
    id: number;
    account: AccountType;
    description: string;
    color: string;
    value: number;
    initialValue: number;
};
