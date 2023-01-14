import * as C from './CategoryItem.styled'
import { useContext } from 'react'
import { Context } from '../../context/context'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { CategoryType, SubCategories } from '../../types/UserType';


type Props = {
    category: CategoryType | SubCategories;
    isCategory: boolean;
    type: 'expense' | 'income';
    removeCategory?: (id: CategoryType) => Promise<void>
    removeSubCategory?: (id: SubCategories) => Promise<void>
    newSub?: (type: 'category' | 'subcategory', edit: boolean) => void;
    setId?: (id: number) => void;
    edit: (type: 'category' | 'subcategory', category: CategoryType | SubCategories) => void
}

export const CategoryItem = ({ category, isCategory, type, removeCategory, removeSubCategory, newSub, setId, edit }: Props) => {
    const { state } = useContext(Context)

    const removeItem = () => {
        if (isCategory) {
            const item = category as CategoryType
            if (removeCategory) {
                removeCategory(item)
            }
        } else {
            const item = category as SubCategories
            if (removeSubCategory) {
                removeSubCategory(item)
            }
        }
    }

    const editCategory = () => {
        edit(isCategory ? 'category' : 'subcategory', category)
    }

    const newSubCategory = () => {
        if (newSub && setId) {
            newSub('subcategory', false)
            setId(category.id)
        }
    }

    return (
        <C.Container Type={type} Color={category.color} Theme={state.theme.theme}>
            <td>
                <div className={isCategory ? '' : 'nameCategory'} >
                    {!isCategory &&
                        <div className='icon'>
                            <SubdirectoryArrowRightIcon />
                        </div>
                    }
                    <span>{category.name}</span>
                </div>
            </td>
            <td>
                <div className={isCategory ? 'colorCategory' : 'colorCategory small'}></div>
            </td>
            <td>
                <div className='actionArea'>
                    <div onClick={editCategory} className='icon'><EditIcon /></div>
                    <div onClick={removeItem} className='icon'><DeleteOutlineIcon /></div>
                    {isCategory &&
                        <div onClick={newSubCategory} className='icon add'><AddIcon /></div>
                    }
                </div>
            </td>
        </C.Container>
    )
}