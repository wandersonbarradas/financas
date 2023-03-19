import * as C from "./FilterArea.styled";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";
import { ModalExpenseCatItem } from "../modalExpenseCatItem/ModalExpenseCatItem";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Props = {
    show: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FilterArea = ({ show, setOpen }: Props) => {
    const { state } = useContext(Context);
    const [right, setRight] = useState(-500);
    const [Opacity, setOpacity] = useState(0);

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                setRight(0);
                setOpacity(0.5);
            }, 225);
        }
    }, [show]);

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
    };

    const removeFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const el = e.currentTarget.closest(".field") as HTMLDivElement;
        if (el) {
            el.classList.remove("focus");
        }
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
                                <label htmlFor="">Categorias</label>
                                <div className="fieldInput">
                                    <div>
                                        <ModalExpenseCatItem
                                            filterItem={{
                                                name: "Todas as categorias",
                                                color: state.theme.theme
                                                    .colorOpacity,
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            onFocus={addFocus}
                                            onBlur={removeFocus}
                                        />
                                        <div className="fieldIcon">
                                            <ExpandMoreOutlinedIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="">Contas</label>
                                <div className="fieldInput">
                                    <div>
                                        <ModalExpenseCatItem
                                            filterItem={{
                                                name: "Todas as contas",
                                                color: state.theme.theme
                                                    .colorOpacity,
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            onFocus={addFocus}
                                            onBlur={removeFocus}
                                        />
                                        <div className="fieldIcon">
                                            <ExpandMoreOutlinedIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="">Tags</label>
                                <div className="fieldInput">
                                    <div>
                                        <ModalExpenseCatItem
                                            filterItem={{
                                                name: "Todas as tags",
                                                color: state.theme.theme
                                                    .colorOpacity,
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            onFocus={addFocus}
                                            onBlur={removeFocus}
                                        />
                                        <div className="fieldIcon">
                                            <ExpandMoreOutlinedIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="">Situações</label>
                                <div className="fieldInput">
                                    <div>
                                        <ModalExpenseCatItem
                                            filterItem={{
                                                name: "Todas as situções",
                                                color: state.theme.theme
                                                    .colorOpacity,
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            onFocus={addFocus}
                                            onBlur={removeFocus}
                                        />
                                        <div className="fieldIcon">
                                            <ExpandMoreOutlinedIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="">Tipos</label>
                                <div className="fieldInput">
                                    <div>
                                        <ModalExpenseCatItem
                                            filterItem={{
                                                name: "Todas os tipos",
                                                color: state.theme.theme
                                                    .colorOpacity,
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            onFocus={addFocus}
                                            onBlur={removeFocus}
                                        />
                                        <div className="fieldIcon">
                                            <ExpandMoreOutlinedIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="fieldDate">
                                <div className="field">
                                    <label htmlFor="dateIn">Tipos</label>
                                    <div className="fieldInput">
                                        <input
                                            id="dateIn"
                                            type="text"
                                            onFocus={addFocus}
                                            onBlur={removeFocus}
                                            placeholder="01 de Março"
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="dateUntil">Até</label>
                                    <div className="fieldInput">
                                        <input
                                            type="text"
                                            id="dateUntil"
                                            onFocus={addFocus}
                                            onBlur={removeFocus}
                                            placeholder="31 de Março"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="filtersActions">
                            <button className="filtersBtn">Cancelar</button>
                            <button className="filtersBtn">
                                Aplicar Filtros
                            </button>
                        </div>
                    </div>
                </C.Container>
            )}
        </>
    );
};
