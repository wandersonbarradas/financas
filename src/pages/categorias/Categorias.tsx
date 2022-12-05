import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/context';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CategoryItem } from '../../components/CategoryItem/CategoryItem';
import { CategoryType, SubCategories } from '../../types/UserType';
import Api from '../../Api';
import * as C from './Categorias.styled'
import { AlertAviso } from '../../components/alertAviso/AlertAviso';

export const Categorias = () => {
    const { state, dispatch } = useContext(Context)
    const [category, setCategory] = useState<CategoryType[]>([])
    const [subcategory, setSubcategory] = useState<SubCategories[]>([])
    const [typeCategory, setTypeCategory] = useState<"expense" | "income">('expense')
    const [actionModal, setActionModal] = useState(false)
    const [modalContainer, setModalContainer] = useState({ display: false, opacity: 0 });
    const [modalType, setModalType] = useState(false)
    const [modalCategory, setModalCategory] = useState(false)
    const [nameCategory, setNameCategory] = useState('')
    const [colorCategory, setColorCategory] = useState(state.theme.theme.colorPrimary)
    const [typeModal, setTypeModal] = useState<'category' | 'subcategory'>('category')
    const [idCategory, setIdCategory] = useState(0)
    const [inputSearch, setInputSearch] = useState(false)
    const [selectCategory, setSelectCategory] = useState<CategoryType | SubCategories | null>(null)
    const [valueSearch, setValueSearch] = useState('')
    const [colorAlert, setColorAlert] = useState('')
    const [textAlert, setTextAlert] = useState('')
    const [displayAlert, setDisplayAlert] = useState(false)

    useEffect(() => {
        dispatch({
            type: 'setSelectMonth',
            payload: { selectMonth: false }
        })
        getData()
    }, []);

    useEffect(() => {
        filterCategory(typeCategory)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.user.categories, typeCategory]);

    const getData = async () => {
        if (state.user.data) {
            const categoriesData: { categories: CategoryType[] } = await Api.getCategory(state.user.data.id, 'categories')
            const subCategoriesData: { subcategories: SubCategories[] } = await Api.getCategory(state.user.data.id, 'subcategories')
            if (categoriesData) {
                dispatch({
                    type: 'setCategories',
                    payload: { categories: categoriesData.categories }
                })
            }
            if (subCategoriesData) {
                dispatch({
                    type: 'setSubCategories',
                    payload: { subcategories: subCategoriesData.subcategories }
                })
            }
        }
    }

    const filterCategory = (filter: "expense" | "income") => {
        const resultCategories = state.user.categories?.filter((item) => item.type === filter)
        if (resultCategories) {
            resultCategories.sort((a, b) => {
                if (a.name < b.name) {
                    return -1
                } else {
                    return 1
                }
            })
            setCategory(resultCategories)
            const subcategories: SubCategories[] = []
            resultCategories.map(item => {
                state.user.subcategories?.map(value => {
                    if (value.category === item.id) {
                        subcategories.push(value)
                    }
                })
            })
            subcategories.sort((a, b) => {
                if (a.name < b.name) {
                    return -1
                } else {
                    return 1
                }
            })
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
            clearValue()
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

    const setNewCategory = async (category: CategoryType) => {
        if (state.user.data === null) {
            return;
        }
        const t = state.user.categories?.filter(item => item.id === category.id)
        if (t && t.length > 0) {
            console.log('entrou')
            await Api.removeCategory(state.user.data.id, t[0])
        }
        await Api.setCategory(state.user.data.id, category)
        getData()
    }

    const openModalCategory = (type: 'category' | 'subcategory', edit: boolean) => {
        setColorCategory(state.theme.theme.colorPrimary)
        setTypeModal(type)
        setActionModal(edit)
        setModalContainer({ display: true, opacity: 0 })
        setModalCategory(true)
        setTimeout(() => {
            setModalContainer({ display: true, opacity: 1 })
        }, 100)
    }

    const removeCategory = async (category: CategoryType,) => {
        if (!state.user.data) {
            return
        }
        await Api.removeCategory(state.user.data.id, category)
        getData()
        handleAlert('#f02927', 'Categoria removida com sucesso!')
    }

    const removeSubCategory = async (subCategory: SubCategories,) => {
        if (!state.user.data) {
            return
        }
        await Api.removeSubCategory(state.user.data.id, subCategory)
        getData()
        handleAlert('#f02927', 'Subcategoria removida com sucesso!')
    }

    const addCategory = async () => {
        const t = state.user.categories?.sort((a, b) => {
            return b.id - a.id
        })
        if (t === undefined) {
            return;
        }
        const cat: CategoryType = {
            id: t.length > 0 ? t[0].id + 1 : 1,
            color: colorCategory,
            name: nameCategory,
            type: typeCategory
        }
        await setNewCategory(cat)
        closeModalType()
        handleAlert('#4FD18B', 'Categoria adicionada com sucesso!')
    }

    const addSubCategory = async () => {
        //verificando se existe usuario logado
        if (!state.user.data) {
            return
        }
        //buscando a categoria que estamos adicionando um subcategoria
        const cat = state.user.categories?.filter(item => item.id === idCategory)[0]
        //verificando se existe essa categoria
        if (!cat) {
            return
        }
        //ordenanado ads subcategorias por id decrecente
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
            name: nameCategory,
            category: idCategory
        }
        //adicinando a nova subcategoria criada a categoria
        await Api.setSubCategory(state.user.data.id, newsubcat)
        await getData()
        setNameCategory('')
        setColorCategory('')
        closeModalType()
        handleAlert('#4FD18B', 'Subcategoria adicionada com sucesso!')
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
        setNameCategory(category.name)
        openModalCategory(type, true)
        setColorCategory(category.color)
        setSelectCategory(category)
    }

    const editCategory = async () => {
        if (selectCategory === null || state.user.data === null) {
            return;
        }
        if (typeModal === 'category') {
            const editCategory = selectCategory as CategoryType
            await Api.removeCategory(state.user.data.id, editCategory)
            editCategory.name = nameCategory;
            editCategory.color = colorCategory
            await Api.setCategory(state.user.data.id, editCategory)
        } else {
            const editSubcategory = selectCategory as SubCategories
            await Api.removeSubCategory(state.user.data.id, editSubcategory)
            editSubcategory.name = nameCategory;
            editSubcategory.color = colorCategory
            await Api.setSubCategory(state.user.data.id, editSubcategory)
        }
        setNameCategory('')
        setColorCategory('')
        setSelectCategory(null)
        closeModalType()
        handleAlert('#4FD18B', 'Categoria editada com sucesso!')
    }

    const clearValue = () => {
        setNameCategory('')
        setColorCategory('')
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
                </div>
            </div>
            <div className='body'>
                <table className="tableCategoria">
                    <thead>
                        <tr>
                            <th scope='col'>Nome</th>
                            <th scope='col'>Ícone</th>
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
                <div className='footerTable'></div>
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
                    {modalCategory &&
                        <div className='modalNewCategory'>
                            <h4>Cadastrar nova {typeModal === 'category' ? 'categoria' : 'subcategoria'}</h4>
                            <div className='form'>
                                <div className='inptu-item'>
                                    <input
                                        value={nameCategory}
                                        placeholder='Nome'
                                        type="text"
                                        onChange={
                                            (e: React.ChangeEvent<HTMLInputElement>) => setNameCategory(e.currentTarget.value)
                                        } />
                                </div>
                                {typeModal === 'category' &&
                                    <div className='otherFields'>
                                        <div className='field'>
                                            <label htmlFor="">Cor da Categoria</label>
                                            <input type="color"
                                                value={colorCategory}
                                                onChange={
                                                    (e: React.ChangeEvent<HTMLInputElement>) => setColorCategory(e.currentTarget.value)
                                                } />
                                        </div>

                                    </div>
                                }
                                <div className='footer'>
                                    {!actionModal &&
                                        <button onClick={typeModal === 'category' ? addCategory : addSubCategory}>Adicionar</button>
                                    }{actionModal &&
                                        <button onClick={editCategory}>Editar</button>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }
            <AlertAviso color={colorAlert} label={textAlert} display={displayAlert} />
        </C.Container>
    )
}