import * as C from './ListCategoryMobile.styled'
import { Context } from '../../context/context';
import { useContext, useState } from 'react';
import { CategoryType, SubCategories } from '../../types/UserType';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import MoreVertOutlined from '@mui/icons-material/MoreVertOutlined';
import { Modal } from '../modais/Modais';

type Props = {
    item: CategoryType | SubCategories;
    isCategory: boolean;
    type: 'expense' | 'income';
    edit: (type: 'category' | 'subcategory', category: CategoryType | SubCategories) => void;
    removeCategory?: (id: CategoryType) => Promise<void>;
    removeSubCategory?: (id: SubCategories) => Promise<void>;
    newSub?: (type: 'category' | 'subcategory', edit: boolean) => void;
    setId?: (id: number) => void;
}

export const ListCategoryMobile = ({ item, isCategory, type, edit, removeCategory, removeSubCategory, newSub, setId }: Props) => {
    const { state } = useContext(Context)
    const [modalOptions, setModalOptions] = useState(false)
    const [coordinates, setCoordinates] = useState({ top: 0, left: 0 })

    const handleActions = (e: React.MouseEvent<HTMLDivElement>) => {
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();
        setCoordinates({ top: rect.top - 100, left: rect.left - 100 })
        setModalOptions(true)
    }

    const editCategory = () => {
        edit(isCategory ? 'category' : 'subcategory', item)
        setModalOptions(false)
    }

    const removeItem = () => {
        if (isCategory) {
            const category = item as CategoryType
            if (removeCategory) {
                removeCategory(category)
            }
        } else {
            const subcategory = item as SubCategories
            if (removeSubCategory) {
                removeSubCategory(subcategory)
            }
        }
    }

    const newSubCategory = () => {
        if (newSub && setId) {
            newSub('subcategory', false)
            setId(item.id)
        }
    }
    return (
        <C.Container CategoryColor={item.color} Type={type} Theme={state.theme.theme}>
            <div className='categoryColor'>
                {!isCategory &&
                    <div className='icon'>
                        <SubdirectoryArrowRightIcon fontSize='small' />
                    </div>
                }
                <span className={isCategory ? 'colorCategory' : 'colorCategory small'}></span>
            </div>
            <div className='categoryName'>
                <p>{item.name}</p>
            </div>
            <div className='categoryActionArea'>
                <div onClick={editCategory} className='icon'><EditIcon /></div>
                <div onClick={removeItem} className='icon'><DeleteOutlineIcon /></div>
                {isCategory &&
                    <div onClick={newSubCategory} className='icon add'><AddIcon /></div>
                }
            </div>
            <div className='actionMobile'>
                {isCategory &&
                    <div onClick={newSubCategory} className='icon add'><AddIcon /></div>
                }
                <div onClick={handleActions} className='icon'>
                    <MoreVertOutlined />
                </div>
            </div>
            {modalOptions &&
                <Modal modalOpacity={0} open={modalOptions} setOpen={setModalOptions} clickAway={true}>
                    <C.MenuActionsMobile Theme={state.theme.theme} coordinates={coordinates}>
                        <div onClick={editCategory} className='optionsItem'>
                            <div className='icon'>
                                <EditIcon />
                            </div>
                            <span>Editar</span>
                        </div>
                        <div onClick={removeItem} className='optionsItem'>
                            <div className='icon'>
                                <DeleteOutlineIcon />
                            </div>
                            <span>Deletar</span>
                        </div>
                    </C.MenuActionsMobile>
                </Modal>
            }
        </C.Container>
    )
}