import * as C from "./FilterArea.styled";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";
import { ModalExpenseCatItem } from "../modalExpenseCatItem/ModalExpenseCatItem";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CategoryType, SubCategories } from "../../types/UserType";
import { AccountType, UserAccountType } from "../../types/AccountsType";
import { ListCategoriesAndAccounts } from "../modalListCategoriesAndAccounts";
import { FilterItem } from "../../pages/transactions/transactions";

type Props = {
    show: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onClick: React.Dispatch<React.SetStateAction<FilterItem[]>>;
};

export const FilterArea = ({ show, setOpen, onClick }: Props) => {
    const { state } = useContext(Context);
    const [right, setRight] = useState(-500);
    const [Opacity, setOpacity] = useState(0);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [subcategories, setSubcategories] = useState<SubCategories[]>([]);
    const [accounts, setAccounts] = useState<UserAccountType[]>([]);
    const [tags, setTags] = useState([]);
    const [status, setStatus] = useState<boolean[]>([]);
    const [types, setTypes] = useState<"expense"[] | "income"[] | "transfer"[]>(
        [],
    );
    const [dates, setDates] = useState<{ from: Date; to: Date }[]>([]);
    const [listCategories, setListCategories] = useState<boolean>(false);
    const [listAccount, setListAccounts] = useState(false);

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                setRight(0);
                setOpacity(0.5);
            }, 225);
        }
    }, [show]);

    useEffect(() => {
        if (!listCategories) {
            document.getElementById("fieldCategories")?.blur();
        } else {
            document.getElementById("fieldCategories")?.focus();
        }

        if (!listAccount) {
            document.getElementById("fieldAccounts")?.blur();
        } else {
            document.getElementById("fieldAccounts")?.focus();
        }
    }, [listCategories, listAccount]);

    useEffect(() => {
        window.history.pushState(null, "", window.location.pathname);
        window.addEventListener("popstate", onBackButtonEvent);
    }, []);

    const onBackButtonEvent = (e: PopStateEvent) => {
        e.preventDefault();
        window.history.pushState(null, "", window.location.pathname);
        closeModalMobile();
    };

    const closeModalMobile = () => {
        window.removeEventListener("popstate", onBackButtonEvent);
        closeModal();
    };

    const closeModal = () => {
        setRight(-500);
        setOpacity(0);
        setTimeout(() => {
            setOpen(false);
        }, 225);
    };

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
        const element = e.target as HTMLDivElement;
        if (element.id === "modalFilter") {
            closeModal();
        }
    };

    const addFocus = (e: React.FocusEvent) => {
        const el = e.currentTarget.closest(".field") as HTMLDivElement;
        if (el) {
            el.classList.add("focus");
        }
        if (e.currentTarget.id === "fieldCategories") {
            setListCategories(true);
            setListAccounts(false);
        } else if (e.currentTarget.id === "fieldAccounts") {
            setListAccounts(true);
            setListCategories(false);
        }
    };

    const removeFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const el = e.currentTarget.closest(".field") as HTMLDivElement;
        if (el) {
            el.classList.remove("focus");
        }
        if (e.currentTarget.id === "fieldCategories") {
            setTimeout(() => {
                setListCategories(false);
            }, 300);
        } else if (e.currentTarget.id === "fieldAccounts") {
            setTimeout(() => {
                setListAccounts(false);
            }, 300);
        }
    };

    const handleCategory = (item: SubCategories | CategoryType) => {
        const subcat = item as unknown as SubCategories;
        if (subcat.category) {
            const items = [...subcategories];
            const exist = items.find((i) => i.id === subcat.id);
            if (!exist) {
                items.push(subcat);
                setSubcategories(items);
            }
        } else {
            const cat = item as unknown as CategoryType;
            const items = [...categories];
            const exist = items.find((i) => i.id === cat.id);
            if (!exist) {
                items.push(cat);
                setCategories(items);
            }
        }
        setListCategories(false);
    };

    const handleAccount = (item: UserAccountType) => {
        const items = [...accounts];
        const exist = items.find((i) => i.id === item.id);
        if (!exist) {
            items.push(item);
            setAccounts(items);
        }
        setListAccounts(false);
    };

    const removeItem = (
        type: "category" | "subcategory" | "account",
        item: UserAccountType | CategoryType | SubCategories,
    ) => {
        if (type === "account") {
            const account = item as UserAccountType;
            const newList = accounts.filter((i) => i.id !== account.id);
            setAccounts(newList);
        } else if (type === "category") {
            const category = item as CategoryType;
            const newList = categories.filter((i) => i.id !== category.id);
            setCategories(newList);
        } else if (type === "subcategory") {
            const subcategory = item as SubCategories;
            const newList = subcategories.filter(
                (i) => i.id !== subcategory.id,
            );
            setSubcategories(newList);
        }
    };

    const assembleFilters = () => {
        const arrayFilters: FilterItem[] = [];
        if (categories.length > 0) {
            categories.forEach((item) => {
                const filter: FilterItem = {
                    type: "category",
                    parameters: item,
                    description: item.name,
                    color: item.color,
                };
                arrayFilters.push(filter);
            });
        }
        if (subcategories.length > 0) {
            subcategories.forEach((item) => {
                const cat = state.user.categories?.filter(
                    (i) => i.id === item.category,
                )[0];
                if (cat) {
                    const filter: FilterItem = {
                        type: "subcategory",
                        parameters: item,
                        description: `${cat.name} > ${item.name}`,
                        color: item.color,
                    };
                    arrayFilters.push(filter);
                }
            });
        }
        if (accounts.length > 0) {
            accounts.forEach((item) => {
                const filter: FilterItem = {
                    type: "account",
                    parameters: item,
                    description: item.description,
                    color: item.color,
                };
                arrayFilters.push(filter);
            });
        }
        onClick(arrayFilters);
        closeModal();
    };

    return (
        <>
            {show && (
                <C.Container
                    onClick={handleCloseModal}
                    id="modalFilter"
                    Right={right}
                    Theme={state.theme.theme}
                    Opacity={Opacity}
                >
                    <div className="filterArea">
                        <div className="headerFilterArea">
                            <div onClick={closeModal} className="iconMore">
                                <ArrowBackIcon fontSize="large" />
                            </div>
                            <h3>Filtro de Transações</h3>
                        </div>

                        <div className="fields scroll">
                            <div className="field">
                                <label htmlFor="fieldCategories">
                                    Categorias
                                </label>
                                <div className="fieldInput">
                                    <div className="filterSelectedItems">
                                        {categories.length <= 0 &&
                                            subcategories.length <= 0 && (
                                                <ModalExpenseCatItem
                                                    filterItem={{
                                                        name: "Todas as categorias",
                                                        color: state.theme.theme
                                                            .colorOpacity,
                                                    }}
                                                />
                                            )}
                                        {categories.map((item, index) => (
                                            <ModalExpenseCatItem
                                                category={item}
                                                key={index}
                                                removeItem={removeItem}
                                            />
                                        ))}
                                        {subcategories.map((item, index) => (
                                            <ModalExpenseCatItem
                                                subcategory={item}
                                                category={state.user.categories?.find(
                                                    (i) =>
                                                        i.id === item.category,
                                                )}
                                                key={index}
                                                removeItem={removeItem}
                                            />
                                        ))}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            id="fieldCategories"
                                            onFocus={addFocus}
                                            onBlur={removeFocus}
                                        />
                                        <div
                                            onClick={() =>
                                                setListCategories(
                                                    listCategories
                                                        ? false
                                                        : true,
                                                )
                                            }
                                            className={`fieldIcon ${
                                                listCategories ? "active" : ""
                                            }`}
                                        >
                                            <ExpandMoreOutlinedIcon />
                                        </div>
                                    </div>
                                </div>
                                {listCategories && (
                                    <div className="containerListItems">
                                        <ListCategoriesAndAccounts
                                            categories={state.user.categories}
                                            subcategories={
                                                state.user.subcategories
                                            }
                                            OnClick={handleCategory}
                                            height={250}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="field">
                                <label htmlFor="fieldAccounts">Contas</label>
                                <div className="fieldInput">
                                    <div className="filterSelectedItems">
                                        {accounts.length <= 0 && (
                                            <ModalExpenseCatItem
                                                filterItem={{
                                                    name: "Todas as contas",
                                                    color: state.theme.theme
                                                        .colorOpacity,
                                                }}
                                            />
                                        )}
                                        {accounts.map((item, index) => (
                                            <ModalExpenseCatItem
                                                account={item}
                                                key={index}
                                                removeItem={removeItem}
                                            />
                                        ))}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            id="fieldAccounts"
                                            onFocus={addFocus}
                                            onBlur={removeFocus}
                                        />
                                        <div
                                            onClick={() =>
                                                setListAccounts(
                                                    listAccount ? false : true,
                                                )
                                            }
                                            className={`fieldIcon ${
                                                listAccount ? "active" : ""
                                            }`}
                                        >
                                            <ExpandMoreOutlinedIcon />
                                        </div>
                                    </div>
                                </div>
                                {listAccount && (
                                    <div className="containerListItems">
                                        <ListCategoriesAndAccounts
                                            accounts={state.user.accounts}
                                            OnClick={handleAccount}
                                            height={250}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="fieldDate">
                                <div className="field">
                                    <label htmlFor="fromDate">Tipos</label>
                                    <div className="fieldInput">
                                        <input
                                            id="fromDate"
                                            type="text"
                                            onFocus={addFocus}
                                            onBlur={removeFocus}
                                            placeholder="01 de Março"
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="toDate">Até</label>
                                    <div className="fieldInput">
                                        <input
                                            type="text"
                                            id="toDate"
                                            onFocus={addFocus}
                                            onBlur={removeFocus}
                                            placeholder="31 de Março"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="filtersActions">
                            <button onClick={closeModal} className="filtersBtn">
                                Cancelar
                            </button>
                            <button
                                onClick={assembleFilters}
                                className="filtersBtn"
                            >
                                Aplicar Filtros
                            </button>
                        </div>
                    </div>
                </C.Container>
            )}
        </>
    );
};
