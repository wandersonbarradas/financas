import * as C from "./Accounts.styled";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";
import AddIcon from "@mui/icons-material/Add";
import { AccountItem } from "../../components/accountItem/AccountItem";
import Api from "../../Api";
import { AccountType, UserAccountType } from "../../types/AccountsType";
import { Modal } from "../../components/modais/Modais";
import { ModalNewAccount } from "../../components/ModalNewAccount/ModalNewAccount";
import {
    NormalTansactionType,
    TransferTansactionType,
} from "../../types/TransactionType";
import { activeSidebarItem } from "../../helpers/helpers";

type ListAccount = {
    name: string;
    id: number;
    value: number;
};

export const Account = () => {
    const { state, dispatch } = useContext(Context);
    const [accounts, setAccounts] = useState<UserAccountType[]>([]);
    const [publicAccounts, setpublicAccounts] = useState<AccountType[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getPublicAccounts();
        dispatch({
            type: "setSelectMonth",
            payload: { selectMonth: false },
        });
        activeSidebarItem("activeLinkNavBar", "account");
    }, []);

    useEffect(() => {
        handleValuesAccounts();
    }, [state.user.transactions]);

    useEffect(() => {
        if (state.user.accounts && accounts !== state.user.accounts) {
            setAccounts(
                state.user.accounts?.sort((a, b) => {
                    return b.id - a.id;
                }),
            );
        }
    }, [state.user.accounts]);

    const getAccounts = async () => {
        const accountsResult = (await Api.getUserDocument(
            state.user.data?.id,
            "accounts",
        )) as UserAccountType[];
        if (accountsResult) {
            dispatch({
                type: "setAccounts",
                payload: { accounts: accountsResult },
            });
            setAccounts(
                accountsResult.sort((a, b) => {
                    return b.id - a.id;
                }),
            );
        }
    };

    const handleValuesAccounts = () => {
        const list: ListAccount[] = [];
        state.user.accounts?.map((item) => {
            const verif = list.findIndex((el) => el.id === item.id);
            if (verif < 0) {
                list.push({
                    name: item.description,
                    id: item.id,
                    value: item.initialValue,
                });
            }
        });
        const transactions = state.user.transactions as NormalTansactionType[];
        transactions.forEach((item) => {
            if (item.type === "transfer") {
                const el = item as unknown as TransferTansactionType;
                attValueBank(
                    list,
                    el.account,
                    el.value,
                    el.type,
                    el.accountFor,
                );
            } else {
                if (!item.done) {
                    return;
                }
                attValueBank(list, item.account, item.value, item.type);
            }
        });
        attBankFirebase(list);
    };

    const attValueBank = async (
        listAccounts: ListAccount[],
        bank: UserAccountType,
        value: number,
        type: "expense" | "income" | "transfer",
        bankFor?: UserAccountType,
    ) => {
        switch (type) {
            case "expense":
                const index1 = listAccounts.findIndex(
                    (item) => item.id === bank.id,
                );
                if (index1 < 0) {
                    return;
                }
                listAccounts[index1].value = listAccounts[index1].value - value;
                console.log(
                    "🚀 ~ file: Accounts.tsx:97 ~ attValueBank ~ listAccounts[index1].value:",
                    listAccounts[index1].value,
                );
                break;
            case "income":
                const index2 = listAccounts.findIndex(
                    (item) => item.id === bank.id,
                );
                if (index2 < 0) {
                    return;
                }
                listAccounts[index2].value = listAccounts[index2].value + value;
                break;
            case "transfer":
                if (bankFor === undefined) {
                    return;
                }
                // //Att bank 1
                const index3 = listAccounts.findIndex(
                    (item) => item.id === bank.id,
                );
                if (index3 < 0) {
                    return;
                }
                listAccounts[index3].value = listAccounts[index3].value - value;

                const index4 = listAccounts.findIndex(
                    (item) => item.id === bankFor.id,
                );
                if (index4 < 0) {
                    return;
                }
                listAccounts[index4].value = listAccounts[index4].value + value;
                break;
        }
    };

    const attBankFirebase = (arr: ListAccount[]) => {
        if (state.user.data === null) {
            return;
        }
        const userId = state.user.data.id;
        arr.map(async (item) => {
            const account = state.user.accounts?.find(
                (el) => el.id === item.id,
            );
            if (account && state.user.accounts) {
                // await Api.removeUserAccount(userId, account)
                account.value = item.value;
                await Api.setUserAccount(userId, account);
                const accountsCopy = state.user.accounts.filter(
                    (i) => i.id !== account.id,
                );
                accountsCopy.push(account);
                dispatch({
                    type: "setAccounts",
                    payload: { accounts: accountsCopy },
                });
            }
        });
    };

    const getPublicAccounts = async () => {
        const accounts = (await Api.getAccountsPublic()) as AccountType[];
        if (accounts) {
            setpublicAccounts(accounts);
        }
    };

    return (
        <C.Container Theme={state.theme.theme}>
            <div className="header">
                <h1>Contas</h1>
                <div className="actions">
                    <div onClick={() => setOpen(true)} className="icon">
                        <AddIcon />
                    </div>
                </div>
            </div>
            <div className="body">
                <div className="box-account">
                    {accounts.map((item, index) => (
                        <AccountItem
                            getAccounts={getAccounts}
                            publicAccounts={publicAccounts}
                            Account={item}
                            key={index}
                        />
                    ))}
                </div>
            </div>
            <Modal
                clickAway={false}
                modalOpacity={0.5}
                open={open}
                setOpen={setOpen}
            >
                <ModalNewAccount
                    getAccount={getAccounts}
                    id={accounts[0]?.id ? accounts[0]?.id + 1 : 1}
                    accounts={publicAccounts}
                    setOpen={setOpen}
                />
            </Modal>
        </C.Container>
    );
};
