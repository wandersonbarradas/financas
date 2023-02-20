import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/context';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CategoryItem } from '../../components/CategoryItem/CategoryItem';
import { CategoryType, SubCategories } from '../../types/UserType';
import Api from '../../Api';
import * as C from './Categories.styled'
import { AlertAviso } from '../../components/alertAviso/AlertAviso';
import { activeSidebarItem } from '../../helpers/helpers';
import { ListCategoryMobile } from '../../components/listCategoryMobile/ListCategoryMobile';
import { Modal } from '../../components/modais/Modais';
import { ModalNewCategory } from '../../components/modalNewCategory/ModalNewCategory';

export const Categories = () => {
    const { state, dispatch } = useContext(Context)
    const [category, setCategory] = useState<CategoryType[]>([])
    const [subcategory, setSubcategory] = useState<SubCategories[]>([])
    const [typeCategory, setTypeCategory] = useState<"expense" | "income">('expense')
    const [toEdit, setToEdit] = useState(false)
    const [modalContainer, setModalContainer] = useState({ display: false, opacity: 0 });
    const [modalType, setModalType] = useState(false)
    const [modalCategory, setModalCategory] = useState(false)
    const [typeModal, setTypeModal] = useState<'category' | 'subcategory'>('category')
    const [idCategory, setIdCategory] = useState(0)
    const [inputSearch, setInputSearch] = useState(false)
    const [selectCategory, setSelectCategory] = useState<CategoryType | SubCategories | null>(null)
    const [valueSearch, setValueSearch] = useState('')
    const [colorAlert, setColorAlert] = useState('')
    const [textAlert, setTextAlert] = useState('')
    const [displayAlert, setDisplayAlert] = useState(false)

    useEffect(() => {
        activeSidebarItem('activeLinkNavBar', 'moreOptions')
        dispatch({
            type: 'setSelectMonth',
            payload: { selectMonth: false }
        })
        // getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!modalCategory) setSelectCategory(null)
    }, [modalCategory]);

    useEffect(() => {
        filterCategory(typeCategory)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.user.categories, state.user.subcategories, typeCategory]);

    const filterCategory = (filter: "expense" | "income") => {
        const resultCategories = state.user.categories?.filter((item) => item.type === filter)
        if (resultCategories) {
            resultCategories.sort((a, b) => a.name < b.name ? -1 : 1)
            setCategory(resultCategories)
            const subcategories: SubCategories[] = []
            resultCategories.forEach(item => {
                state.user.subcategories?.forEach(value => {
                    if (value.category === item.id) {
                        subcategories.push(value)
                    }
                })
            })
            subcategories.sort((a, b) => a.name < b.name ? -1 : 1)
            setSubcategory(subcategories)
        }
    }

    const openModalType = () => {
        setModalContainer({ display: true, opacity: 0 })
        setModalType(true)
        setTimeout(() => {
            setModalContainer({ display: true, opacity: 1 })
        }, 100)
    }

    const closeModalType = () => {
        setModalContainer({ display: true, opacity: 0 })
        setTimeout(() => {
            setModalContainer({ display: false, opacity: 0 })
            setModalType(false)
            setModalCategory(false)
        }, 200)
    }

    const handleModal = (e: React.MouseEvent<HTMLDivElement>) => {
        const element = e.target as HTMLDivElement
        if (element.classList.contains('containerModal')) {
            closeModalType()
        }
    }

    const handleType = (value: "expense" | "income") => {
        setTypeCategory(value)
        closeModalType()
    }

    const openModalCategory = (type: 'category' | 'subcategory', edit: boolean) => {
        setTypeModal(type)
        setToEdit(edit)
        setModalCategory(true)
    }

    const removeCategory = async (category: CategoryType,) => {
        if (!state.user.data) {
            return
        }
        const userId = state.user.data.id;
        try {
            await Api.removeCategory(userId, category)
            const newList = state.user.categories?.filter(i => i.id !== category.id)
            if (newList) {
                dispatch({
                    type: 'setCategories',
                    payload: { categories: newList }
                })
            }
            const subCategories = state.user.subcategories?.filter(item => item.category === category.id)
            if (subCategories) {
                subCategories.forEach(async (i) => await Api.removeSubCategory(userId, i))
            }
            const newListSubcategories = state.user.subcategories?.filter(item => item.category !== category.id)
            if (newListSubcategories) {
                dispatch({
                    type: 'setSubCategories',
                    payload: { subcategories: newListSubcategories }
                })
            }
            handleAlert('#f02927', 'Categoria removida com sucesso!')
        } catch (error: any) {
            handleAlert('#f02927', error.message)
        }
    }

    const removeSubCategory = async (subCategory: SubCategories,) => {
        if (!state.user.data) {
            return
        }
        try {
            await Api.removeSubCategory(state.user.data.id, subCategory)
            const newList = state.user.subcategories?.filter(i => i.id !== subCategory.id)
            if (newList) {
                dispatch({
                    type: 'setSubCategories',
                    payload: { subcategories: newList }
                })
            } else {
                dispatch({
                    type: 'setSubCategories',
                    payload: { subcategories: [] }
                })
            }
            handleAlert('#f02927', 'Subcategoria removida com sucesso!')
        } catch (error: any) {
            handleAlert('#f02927', error.message)
        }


    }

    const handleIdCategory = (id: number) => {
        setIdCategory(id)
    }

    const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        const element = e.target as HTMLElement
        if (!element.classList.contains('inputSearch')) {
            inputSearch ? setInputSearch(false) : setInputSearch(true)
        }
    }

    const handleAlert = (color: string, text: string) => {
        setColorAlert(color)
        setTextAlert(text)
        setDisplayAlert(true)
        setTimeout(() => {
            setDisplayAlert(false)
            setTimeout(() => {
                setColorAlert('')
                setTextAlert('')
            }, 400)
        }, 4000)
    }

    const getSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueSearch(e.currentTarget.value)
        if (valueSearch === '') {
            filterCategory(typeCategory)
            return;
        }
        const filterCat = state.user.categories?.filter(item => item.type === typeCategory)
        if (!filterCat) {
            return;
        }
        const resultCategory = filterCat.filter((item) => item.name.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
        setCategory(resultCategory)
    }

    const handleModalEdit = async (type: 'category' | 'subcategory', category: CategoryType | SubCategories) => {
        setSelectCategory(category)
        openModalCategory(type, true)
    }

    const handleTypeCategory = () => {
        const items = document.querySelectorAll('.typeCategoriaMobile .option')
        if (typeCategory === 'expense') {
            items[0]?.classList.remove('activeExpense')
            items[1]?.classList.add('activeIncome')
            setTypeCategory('income')
        } else {
            items[1]?.classList.remove('activeIncome')
            items[0]?.classList.add('activeExpense')
            setTypeCategory('expense')
        }
    }

    const setNewCategory = async (category: CategoryType) => {
        if (state.user.data === null) {
            return;
        }
        try {
            await Api.setCategory(state.user.data.id, category)
            const newList = state.user.categories?.filter(i => i.id !== category.id)
            if (newList) {
                newList.push(category)
                dispatch({
                    type: 'setCategories',
                    payload: { categories: newList }
                })
            } else {
                dispatch({
                    type: 'setCategories',
                    payload: { categories: [category] }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const setNewSubcategory = async (subcategory: SubCategories) => {
        if (state.user.data === null) {
            return;
        }
        try {
            await Api.setSubCategory(state.user.data.id, subcategory)
            const newList = state.user.subcategories?.filter(i => i.id !== subcategory.id)
            if (newList) {
                newList.push(subcategory)
                dispatch({
                    type: 'setSubCategories',
                    payload: { subcategories: newList }
                })
            } else {
                dispatch({
                    type: 'setSubCategories',
                    payload: { subcategories: [subcategory] }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addCategory = async (name: string, color?: string) => {
        if (!name || !color) {
            Promise.reject(new Error("Nenhum dado foi encontrado para criação da categoria!"))
            return
        }
        const t = state.user.categories?.sort((a, b) => {
            return b.id - a.id
        })
        if (t === undefined) {
            return;
        }
        const newCategory: CategoryType = {
            id: t.length > 0 ? t[0].id + 1 : 1,
            color: color,
            name: name,
            type: typeCategory
        }
        await setNewCategory(newCategory)
        setModalCategory(false)
        handleAlert('#4FD18B', 'Categoria adicionada com sucesso!')
    }

    const addSubCategory = async (name: string) => {
        //verificando se existe usuario logado
        if (name.length < 2) {
            return Promise.reject(new Error("Nome da subcategoria precisa ter pelo menos 2 caracteres!"))

        }
        //buscando a categoria que estamos adicionando um subcategoria
        const cat = state.user.categories?.filter(item => item.id === idCategory)[0]
        //verificando se existe essa categoria
        if (!cat) {
            return
        }
        //ordenanado as subcategorias por id decrecente
        const subCats = state.user.subcategories?.sort((a, b) => {
            return b.id - a.id
        })
        if (!subCats) {
            return
        }
        //criando nova subcategoria
        const newsubcat: SubCategories = {
            id: subCats.length > 0 ? subCats[0].id + 1 : 1,
            color: cat.color,
            name: name,
            category: idCategory
        }
        //adicinando a nova subcategoria criada a categoria
        await setNewSubcategory(newsubcat)
        setModalCategory(false)
        handleAlert('#4FD18B', 'Subcategoria adicionada com sucesso!')
    }

    const editCategory = async (name: string, color?: string) => {
        if (!selectCategory) {
            Promise.reject(new Error("Categoria não encontrada"))
            return;
        }
        if (!name && !color) {
            Promise.reject(new Error("Dados da edição não encontrados"))
            return;
        }
        if (typeModal === 'category') {
            const editCategory = selectCategory as CategoryType
            editCategory.name = name ? name : editCategory.name;
            editCategory.color = color ? color : editCategory.color
            await setNewCategory(editCategory)
            const subCategories = state.user.subcategories?.filter(i => i.category === editCategory.id)
            if (subCategories && color) {
                subCategories.forEach(async (i) => {
                    const item = i
                    item.color = color;
                    await setNewSubcategory(item)
                })
            }
        } else {
            if (!name) {
                Promise.reject(new Error("Dados da edição não encontrados"))
                return
            }
            const editSubcategory = selectCategory as SubCategories
            editSubcategory.name = name;
            await setNewSubcategory(editSubcategory)
        }
        setSelectCategory(null)
        setModalCategory(false)
        handleAlert('#4FD18B', `${typeModal === 'category' ? 'Categoria' : "Subcategoria"} editada com sucesso!`)
    }

    const OnClickModalNewCategory = async (name: string, color?: string) => {
        if (toEdit) {
            try {
                await editCategory(name, color)
            } catch (error: any) {
                console.log(error)
                setSelectCategory(null)
            }

        } else {
            try {
                if (typeModal === 'category') {
                    await addCategory(name, color)
                } else {
                    await addSubCategory(name)
                }
            } catch (error: any) {
                handleAlert('#cc1b1b', error.message)
                setSelectCategory(null)
            }

        }
        setSelectCategory(null)
        filterCategory(typeCategory)
    }

    return (
        <C.Container inputSearch={inputSearch} Type={typeCategory} Modal={modalContainer} Theme={state.theme.theme}>
            <div className='header'>
                <div className='leftSide'>
                    <div className='boxOptions'>
                        <button onClick={() => openModalCategory('category', false)} className='btn add'><AddIcon /></button>
                        <span onClick={handleSearch} className='btn btn-search'>
                            <SearchIcon />
                            <input onChange={getSearch} value={valueSearch} className='inputSearch' type="text" placeholder='Digite o nome da categoria' />
                        </span>
                    </div>
                </div>
                <div className='rightSide'>
                    <div onClick={openModalType} className='typeCategoria'>Categorias de Despesa<KeyboardArrowDownIcon /></div>
                    <div className='typeCategoriaMobile'>
                        <div onClick={handleTypeCategory} className="option activeExpense">Despesas</div>
                        <div onClick={handleTypeCategory} className="option">Receitas</div>
                    </div>
                </div>
            </div>
            <div className='body'>
                {category.length > 0 &&
                    <>
                        <table className="tableCategoria">
                            <thead>
                                <tr>
                                    <th scope='col'>Nome</th>
                                    <th scope='col'>Cor</th>
                                    <th scope='col'>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    category.sort().map((item, index) => (
                                        <>
                                            <CategoryItem newSub={openModalCategory} removeCategory={removeCategory} type={typeCategory} edit={handleModalEdit} setId={handleIdCategory} key={index} category={item} isCategory={true} />
                                            {subcategory.filter(i => i.category === item.id).map((value, valueIndex) => (
                                                <CategoryItem edit={handleModalEdit} removeSubCategory={removeSubCategory} type={typeCategory} key={valueIndex + 1} category={value} isCategory={false} />
                                            ))}
                                        </>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className='tableCategoryMobile'>
                            <ul className='listCategoryMobile'>
                                {
                                    category.sort().map((item, index) => (
                                        <>
                                            <ListCategoryMobile newSub={openModalCategory} setId={handleIdCategory} removeCategory={removeCategory} edit={handleModalEdit} type={typeCategory} key={index} item={item} isCategory={true} />
                                            {subcategory.filter(i => i.category === item.id).map((value, valueIndex) => (
                                                <ListCategoryMobile removeSubCategory={removeSubCategory} edit={handleModalEdit} type={typeCategory} key={valueIndex + 1} item={value} isCategory={false} />
                                            ))}
                                        </>
                                    ))
                                }
                            </ul>
                        </div>
                    </>
                }{category.length === 0 &&
                    <h4 className='emptyCategories'>Sem Categorias 😥 </h4>
                }
            </div>
            {modalContainer.display &&
                <div onClick={handleModal} className='containerModal'>
                    {modalType &&
                        <div className='modalTypeCategoria'>
                            <ul>
                                <li onClick={() => handleType('expense')}>Categorias de Despesa</li>
                                <li onClick={() => handleType('income')}>Categorias de Receita</li>
                            </ul>
                        </div>
                    }
                </div>
            }
            <Modal modalOpacity={0.5} clickAway={true} open={modalCategory} setOpen={setModalCategory}>
                <ModalNewCategory toEdit={toEdit} typeContent={typeModal} selectCategory={selectCategory}
                    submit={OnClickModalNewCategory} type={typeCategory} />
            </Modal>
            <div className='box-alert'>
                <AlertAviso color={colorAlert} label={textAlert} display={displayAlert} />
            </div>
        </C.Container>
    )
}