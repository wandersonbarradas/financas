import * as C from "./transactions.styled";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertOutlined from "@mui/icons-material/MoreVertOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/context";
import { Modal } from "../../components/modais/Modais";
import {
    NormalTansactionType,
    TransferTansactionType,
} from "../../types/TransactionType";
import { TableTransactionsItem } from "../../components/tableTransactionItem/TableTransactionsItem";
import DF from "../../helpers/DateFunctions";
import dayjs from "dayjs";
import { activeSidebarItem } from "../../helpers/helpers";
import { ListTransactionsMobile } from "../../components/listTransactionsMobile/ListTransactionsMobile";
import formatted from "../../helpers/FormattedPrice";
import Api from "../../Api";
import { ModalTransaction } from "../../components/modalTransaction/ModalTransaction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import { ResumeValuesTransactions } from "../../components/resumeValuesTransactions/ResumeValuesTransactions";
import { ModalExpenseCatItem } from "../../components/modalExpenseCatItem/ModalExpenseCatItem";
import { FilterArea } from "../../components/filterArea/FilterArea";
import { CategoryType, SubCategories } from "../../types/UserType";
import { UserAccountType } from "../../types/AccountsType";
import { Filters } from "../../helpers/Filters";

type TypeTransactions = {
    color: string;
    name: "Transações" | "Receitas" | "Despesas" | "Transferências";
};

type TransactionsMobile = {
    [key: string]: NormalTansactionType[];
};

export type FilterItem = {
    type:
        | "date"
        | "category"
        | "subcategory"
        | "account"
        | "tag"
        | "status"
        | "type";
    parameters: CategoryType | SubCategories | UserAccountType;
    description: string;
    color: string;
};

export const Transactions = () => {
    const { state, dispatch } = useContext(Context);
    const [filters, setFilters] = useState<FilterItem[]>([]);
    const [modalFilters, setModalFilters] = useState(false);
    const [transactions, setTransactions] = useState<NormalTansactionType[]>(
        [],
    );
    const [selectedTransaction, setSelectTransaction] = useState<
        NormalTansactionType | null | TransferTansactionType
    >(null);
    const [editTransaction, setEditTransaction] = useState(false);
    const [color, setColor] = useState("");
    const [inputSearch, setInputSearch] = useState(false);
    const [modalType, setModalType] = useState(false);
    const [position, setPosition] = useState({ left: 0, top: 0 });
    const [type, setType] = useState<TypeTransactions>({
        name: "Transações",
        color: state.theme.theme.colorPrimary,
    });
    const [modalDelete, setModalDelete] = useState(false);
    const [modalDeleteMobile, setModalDeleteMobile] = useState(false);

    useEffect(() => {
        activeSidebarItem("activeLinkNavBar", "transactions");
        dispatch({
            type: "setSelectMonth",
            payload: { selectMonth: true },
        });
    }, [dispatch]);

    useEffect(() => {
        if (state.general.selectedTransactions) {
            showSelectedTransaction();
        } else {
            getTransactions();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.user.transactions, state.user.selectedDate, type]);

    useEffect(() => {
        checkTransaction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTransaction]);

    useEffect(() => {
        if (!modalDelete && !editTransaction) {
            setSelectTransaction(null);
        }
    }, [modalDelete, editTransaction]);

    useEffect(() => {
        if (filters.length > 0) {
            createFilters();
        } else {
            getTransactions();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    //Buscando Valores mensais.

    const createFilters = () => {
        const t = state.user.transactions as NormalTansactionType[];
        const trans = DF.getTransactionsSelectDate(
            t,
            dayjs(state.user.selectedDate),
        );
        const transactionsFilters = Filters(trans, filters);
        setTransactions(transactionsFilters);
    };

    const clearFilters = () => {
        setFilters([]);
    };

    const removeFilterItem = (name: string) => {
        setFilters(filters.filter((i) => i.description !== name));
    };

    const showSelectedTransaction = () => {
        if (!state.general.selectedTransactions) {
            return;
        }
        setTransactions([state.general.selectedTransactions]);
        dispatch({
            type: "setSelectedTransactions",
            payload: { selectedTransactions: null },
        });
    };

    const groupByDate = (arr: NormalTansactionType[]): TransactionsMobile => {
        return arr.reduce((acc: any, curr) => {
            const objDate = curr.date as {
                seconds: number;
                nanoseconds: number;
            };
            const date = DF.getStringDate(
                new Date(objDate.seconds * 1000).toDateString(),
            );
            if (!acc[date]) {
                acc[date] = [];
            }

            acc[date].push(curr);
            return acc;
        }, {});
    };

    const handleEdit = (
        item: NormalTansactionType | TransferTansactionType,
    ) => {
        setSelectTransaction(item);
        setEditTransaction(true);
    };

    const handleDelete = (
        item: NormalTansactionType | TransferTansactionType,
    ) => {
        setSelectTransaction(item);
        setModalDelete(true);
    };

    const checkTransaction = () => {
        switch (selectedTransaction?.type) {
            case "expense":
                setColor(state.theme.theme.expenseColor);
                break;
            case "income":
                setColor(state.theme.theme.incomeColor);
                break;
            case "transfer":
                setColor(state.theme.theme.transferColor);
                break;
        }
    };

    const getTransactions = () => {
        let t = state.user.transactions as NormalTansactionType[];
        switch (type.name) {
            case "Despesas":
                t = t.filter((item) => item.type === "expense");
                break;
            case "Receitas":
                t = t.filter((item) => item.type === "income");
                break;
            case "Transferências":
                t = t.filter((item) => item.type === "transfer");
                break;
        }
        const transactionsMonth = DF.getTransactionsSelectDate(
            t,
            dayjs(new Date(state.user.selectedDate)),
        );
        transactionsMonth.sort((a, b) => {
            const ad = a.date as { seconds: number; nanoseconds: number };
            const bd = b.date as { seconds: number; nanoseconds: number };
            if (new Date(ad.seconds * 1000) < new Date(bd.seconds * 1000)) {
                return 1;
            } else {
                return -1;
            }
        });
        setTransactions(transactionsMonth);
    };

    const handleModalType = (e: React.MouseEvent<HTMLDivElement>) => {
        const pos = e.currentTarget.getBoundingClientRect() as DOMRect;
        setPosition({ left: pos.left, top: pos.top + 60 });
        setModalType(true);
    };

    const handleType = (
        type: "transactions" | "income" | "expense" | "transfer",
    ) => {
        switch (type) {
            case "expense":
                setType({
                    name: "Despesas",
                    color: state.theme.theme.expenseColor,
                });
                break;
            case "income":
                setType({
                    name: "Receitas",
                    color: state.theme.theme.incomeColor,
                });
                break;
            case "transactions":
                setType({
                    name: "Transações",
                    color: state.theme.theme.colorPrimary,
                });
                break;
            case "transfer":
                setType({
                    name: "Transferências",
                    color: state.theme.theme.transferColor,
                });
                break;
        }
        setModalType(false);
    };

    const deleteTransaction = async () => {
        if (state.user.data === null || !selectedTransaction) {
            return;
        }
        await Api.removeTransaction(state.user.data.id, selectedTransaction);
        const transactions = state.user
            .transactions as unknown as NormalTansactionType[];
        const arr = transactions.filter(
            (el) => el.id !== selectedTransaction.id,
        );
        dispatch({
            type: "setTransactions",
            payload: { transactions: arr },
        });
        setSelectTransaction(null);
        setModalDelete(false);
        setModalDeleteMobile(false);
    };

    const handleSearch = (e: React.MouseEvent<HTMLSpanElement>) => {
        const input = e.target as HTMLElement;
        if (!input.classList.contains("svg")) {
            return;
        }
        if (inputSearch) {
            setInputSearch(false);
        } else {
            //e.currentTarget.querySelector("input")?.focus();
            setInputSearch(true);
        }
    };

    return (
        <C.Container
            position={position}
            colorType={type.color}
            Theme={state.theme.theme}
            inputSearch={inputSearch}
            ColorDelete={color}
            sideBar={state.general.sideBar}
        >
            <div className="header">
                <div className="topLine">
                    <div className="leftSide">
                        <div onClick={handleModalType} className="type">
                            {type.name}
                            <KeyboardArrowDownIcon />
                        </div>
                    </div>
                    <div className="rightSide">
                        <div className="boxOptions">
                            <span
                                onClick={handleSearch}
                                className="btn btn-search"
                            >
                                <input
                                    id="inputSearch"
                                    className="inputSearch"
                                    type="text"
                                    placeholder="Digite o nome da categoria"
                                />
                                <SearchIcon className="svg" />
                            </span>
                            <div
                                onClick={() => setModalFilters(true)}
                                className="btn"
                            >
                                <FilterAltOutlinedIcon />
                            </div>
                            <div className="btn">
                                <MoreVertOutlined />
                            </div>
                        </div>
                    </div>
                </div>
                <ResumeValuesTransactions
                    transactions={transactions}
                    type={type}
                    filters={filters.length > 0 ? true : false}
                />
            </div>
            <div className="body">
                {filters.length > 0 && (
                    <div className="filterList">
                        <span className="title">Filtros:</span>
                        <div className="containerFilterList">
                            {filters.map((item, index) => (
                                <ModalExpenseCatItem
                                    filterItem={{
                                        name: item.description,
                                        color: item.color,
                                    }}
                                    key={index}
                                    OnClick={removeFilterItem}
                                />
                            ))}
                        </div>
                        <div onClick={clearFilters} className="filterIcon">
                            <CloseIcon />
                        </div>
                    </div>
                )}
                {transactions.length > 0 && (
                    <>
                        <table className="tableTransactions">
                            <thead>
                                <tr>
                                    <th className="done" scope="col">
                                        Situação
                                    </th>
                                    <th className="date" scope="col">
                                        Data
                                    </th>
                                    <th className="description" scope="col">
                                        Descrição
                                    </th>
                                    <th className="category" scope="col">
                                        Categoria
                                    </th>
                                    <th className="account" scope="col">
                                        Conta
                                    </th>
                                    <th className="value" scope="col">
                                        Valor
                                    </th>
                                    <th className="actionArea" scope="col">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((item, index) => (
                                    <TableTransactionsItem
                                        key={index}
                                        item={item}
                                        handleDelete={handleDelete}
                                        handleEdit={handleEdit}
                                    />
                                ))}
                            </tbody>
                        </table>
                        <div className="tableMobile">
                            <ul className="listMobile">
                                {Object.entries(groupByDate(transactions)).map(
                                    (item) => (
                                        <>
                                            <p className="dateTransactionMobile">
                                                {item[0]}
                                            </p>
                                            {item[1].map((i, ind) => (
                                                <ListTransactionsMobile
                                                    Click={handleEdit}
                                                    key={ind}
                                                    item={i}
                                                />
                                            ))}
                                        </>
                                    ),
                                )}
                            </ul>
                        </div>
                    </>
                )}
                {transactions.length <= 0 && (
                    <div className="transactionMessage">
                        <h3>Nenhuma transação encontrada!🦖</h3>
                    </div>
                )}
            </div>
            <Modal
                clickAway={true}
                modalOpacity={0}
                open={modalType}
                setOpen={setModalType}
            >
                <div className="containerToggle">
                    <ul className="listTypes">
                        <li
                            onClick={() => handleType("transactions")}
                            className="listTypeItem"
                        >
                            <span className="tr"></span> Transações
                        </li>
                        <li
                            onClick={() => handleType("expense")}
                            className="listTypeItem"
                        >
                            <span className="ex"></span> Despesas
                        </li>
                        <li
                            onClick={() => handleType("income")}
                            className="listTypeItem"
                        >
                            <span className="in"></span> Receitas
                        </li>
                        <li
                            onClick={() => handleType("transfer")}
                            className="listTypeItem"
                        >
                            <span className="tra"></span> Transferências
                        </li>
                    </ul>
                </div>
            </Modal>
            <Modal
                open={modalDelete}
                setOpen={setModalDelete}
                clickAway={false}
                modalOpacity={0.5}
            >
                {selectedTransaction && (
                    <C.ContainerModalDelete
                        Theme={state.theme.theme}
                        Color={color}
                    >
                        <h3>Deseja realmente deletar essa transação?</h3>
                        <div className="info">
                            <div className="content">
                                <p className="title">Descrição</p>
                                <span>{selectedTransaction.description}</span>
                            </div>
                            <div className="content">
                                <p className="title">Valor</p>
                                <span>
                                    {formatted.format(
                                        selectedTransaction.value,
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="btnArea">
                            <button
                                onClick={() => setModalDelete(false)}
                                className="btn cancelar"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={deleteTransaction}
                                className="btn deletar"
                            >
                                Deletar
                            </button>
                        </div>
                    </C.ContainerModalDelete>
                )}
            </Modal>
            {selectedTransaction && (
                <Modal
                    clickAway={false}
                    modalOpacity={0.5}
                    setOpen={setEditTransaction}
                    open={editTransaction}
                >
                    <div className="boxModalTransaction">
                        <div className="headerBox">
                            <div
                                onClick={() => setEditTransaction(false)}
                                className="icon"
                            >
                                <ArrowBackIcon fontSize="large" />
                            </div>
                            <h3 className="titleTransaction">
                                {selectedTransaction.type === "expense"
                                    ? "Nova despesa"
                                    : selectedTransaction.type === "income"
                                    ? "Nova receita"
                                    : "Nova transferência"}
                            </h3>
                            <div
                                onClick={() => setModalDeleteMobile(true)}
                                className="icon"
                            >
                                <DeleteOutlinedIcon fontSize="large" />
                            </div>
                        </div>
                        <Modal
                            clickAway={true}
                            modalOpacity={0.3}
                            setOpen={setModalDeleteMobile}
                            open={modalDeleteMobile}
                        >
                            <div className="modalDeleteMobile">
                                <div className="title">
                                    Deseja realmente deletar?
                                </div>
                                <div className="boxModalBtn">
                                    <button
                                        onClick={() =>
                                            setModalDeleteMobile(false)
                                        }
                                        className="btn"
                                    >
                                        Não
                                    </button>
                                    <button
                                        onClick={deleteTransaction}
                                        className="btn"
                                    >
                                        Sim
                                    </button>
                                </div>
                            </div>
                        </Modal>
                        <ModalTransaction
                            showDelete={setModalDeleteMobile}
                            item={selectedTransaction}
                            setClose={setEditTransaction}
                            type={selectedTransaction.type}
                        />
                    </div>
                </Modal>
            )}
            {modalFilters && (
                <FilterArea
                    onClick={setFilters}
                    setOpen={setModalFilters}
                    show={modalFilters}
                />
            )}
        </C.Container>
    );
};
