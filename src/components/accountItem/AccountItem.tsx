import * as C from "./AccountItem.styled";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";
import MoreVertOutlined from "@mui/icons-material/MoreVertOutlined";
import { AccountType, UserAccountType } from "../../types/AccountsType";
import { Modal } from "../modais/Modais";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Api from "../../Api";
import { ModalNewAccount } from "../ModalNewAccount/ModalNewAccount";
import Formatted from "../../helpers/FormattedPrice";
import DF from "../../helpers/DateFunctions";
import dayjs from "dayjs";
import {
    NormalTansactionType,
    TransferTansactionType,
} from "../../types/TransactionType";

type Props = {
    Account: UserAccountType;
    getAccounts: () => Promise<void>;
    publicAccounts: AccountType[];
};

export const AccountItem = ({
    Account,
    getAccounts,
    publicAccounts,
}: Props) => {
    const { state } = useContext(Context);
    const [toggle, setToggle] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [modalEdit, setModalEdit] = useState(false);
    const [expectedBalance, setExpectedBalance] = useState(0);

    useEffect(() => {
        getExpectedBalance();
        console.log(Math.floor(Account.value), Account.description);
    }, [state.user.transactions]);

    const handleMenuToggle = (e: React.MouseEvent<HTMLDivElement>) => {
        const data = e.currentTarget.getBoundingClientRect() as DOMRect;
        setPosition({
            left: data.left - 50,
            top: data.top - 50,
        });
        setToggle(true);
    };

    const deleteAccount = async () => {
        if (state.user.data === null) {
            return;
        }
        await Api.removeUserAccount(state.user.data.id, Account);
        setToggle(false);
        getAccounts();
    };

    const hanldeEditAccount = () => {
        setToggle(false);
        setModalEdit(true);
    };

    const getExpectedBalance = () => {
        let valueAccount = Account.value;
        if (!state.user.transactions) {
            return;
        }
        let transactions = state.user.transactions as NormalTansactionType[];
        transactions = DF.getTransactionsSelectDate(
            transactions,
            dayjs(new Date()),
        );
        transactions.forEach((item) => {
            if (
                item.type !== "transfer" &&
                !item.done &&
                item.account.id === Account.id
            ) {
                switch (item.type) {
                    case "expense":
                        valueAccount -= item.value;
                        break;
                    case "income":
                        valueAccount += item.value;
                        break;
                }
            }
        });
        setExpectedBalance(valueAccount);
    };

    return (
        <C.Container Theme={state.theme.theme}>
            <div className="headerAccount">
                <div className="bankInfo">
                    <div className="bankImage">
                        <img src={Account.account.imgUrl} alt="" />
                    </div>
                    <span className="label">{Account.description}</span>
                </div>
                <div className="icon" onClick={handleMenuToggle}>
                    <MoreVertOutlined />
                </div>
            </div>
            <div className="rowResume">
                <span className="label">Saldo atual</span>
                <span
                    className={Account.value >= 0 ? "value more" : "value less"}
                >
                    {Formatted.format(Number(Account.value.toFixed(2)))}
                </span>
            </div>
            <div className="rowResume">
                <span className="label">Saldo previsto</span>
                <span
                    className={
                        expectedBalance >= 0 ? "value more" : "value less"
                    }
                >
                    {Formatted.format(Number(expectedBalance.toFixed(2)))}
                </span>
            </div>
            <button className="add-expense">ADICIONAR DESPESA</button>
            <Modal
                clickAway={true}
                modalOpacity={0}
                open={toggle}
                setOpen={setToggle}
            >
                <C.ToggleMenu Theme={state.theme.theme} Position={position}>
                    <li onClick={hanldeEditAccount}>
                        <div className="icon">
                            <EditOutlinedIcon />{" "}
                        </div>{" "}
                        Editar
                    </li>
                    <li onClick={deleteAccount}>
                        <div className="icon">
                            <DeleteOutlineIcon />{" "}
                        </div>{" "}
                        Excluir
                    </li>
                </C.ToggleMenu>
            </Modal>
            <Modal
                clickAway={false}
                modalOpacity={0.5}
                open={modalEdit}
                setOpen={setModalEdit}
            >
                <ModalNewAccount
                    getAccount={getAccounts}
                    id={Account.id}
                    accounts={publicAccounts}
                    setOpen={setModalEdit}
                    item={Account}
                />
            </Modal>
        </C.Container>
    );
};
