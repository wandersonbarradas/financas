import { NormalTansactionType } from '../../types/TransactionType';
import * as C from './ListCategoryMobile.styled'
import { Context } from '../../context/context';
import { useContext, useEffect, useState } from 'react';
import formattedPrice from '../../helpers/FormattedPrice';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { CategoryType, SubCategories } from '../../types/UserType';

type Props = {
    item: CategoryType | SubCategories;
    isCategory: boolean;
}

export const ListCategoryMobile = ({ item, isCategory }: Props) => {
    const { state } = useContext(Context)

    return (
        <C.Container color='' ColorCategory={item.type === 'transfer' ? state.theme.theme.transferColor : item.category.color} Theme={state.theme.theme}>
            <div className='transactionColor'>
                <span className='transactionBoxColor'></span>
            </div>
            <div className='transactionInfo flex-column'>
                <p className='transactionDescription'>{item.description}</p>
                {item.type === 'transfer' &&
                    <span className='transactionAC'>Transferência</span>
                }{item.type !== 'transfer' &&
                    <span className='transactionAC'>
                        {`${item.subcategory ? item.subcategory.name : item.category.name} | ${item.account.description}`}
                    </span>
                }
            </div>
            <div className='transactionValueAction flex-column'>
                <span className={`transactionValue ` + item.type}>R$ {formattedPrice(item.value)}</span>
                <div className='transactionDone' >
                    {item.done &&
                        <div className='icon true'>
                            <CheckIcon />
                        </div>
                    }{!item.done &&
                        <div className='icon false'>
                            <CloseIcon />
                        </div>
                    }
                </div>
            </div>
        </C.Container>
    )
}