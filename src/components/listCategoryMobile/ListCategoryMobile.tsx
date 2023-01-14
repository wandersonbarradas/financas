import * as C from './ListCategoryMobile.styled'
import { Context } from '../../context/context';
import { useContext } from 'react';
import { CategoryType, SubCategories } from '../../types/UserType';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import MoreVertOutlined from '@mui/icons-material/MoreVertOutlined';

type Props = {
    item: CategoryType | SubCategories;
    isCategory: boolean;
    type: 'expense' | 'income'
}

export const ListCategoryMobile = ({ item, isCategory, type }: Props) => {
    const { state } = useContext(Context)

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
                <div className='icon'><EditIcon /></div>
                <div className='icon'><DeleteOutlineIcon /></div>
                {isCategory &&
                    <div className='icon add'><AddIcon /></div>
                }
            </div>
            <div className='more'>
                <div className='icon'>
                    <MoreVertOutlined />
                </div>
            </div>
        </C.Container>
    )
}