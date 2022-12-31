import { UserAccountType } from '../../types/AccountsType';
import { NormalTansactionType } from '../../types/TransactionType';
import { CategoryType, SubCategories } from '../../types/UserType';
import * as C from './ModalExpenseCatItem.styled';
import { useContext } from 'react';
import { Context } from '../../context/context';

type Props = {
    category?: CategoryType;
    subcategory?: SubCategories;
    account?: UserAccountType;
}

export const ModalExpenseCatItem = ({ category, subcategory, account }: Props) => {
    const { state } = useContext(Context)
    if (category && !subcategory) {
        return (
            <C.Container colorTitle={state.theme.theme.colorTitle} colorPrimary={category.color}>
                <p className='text-nowrap' >{category.name}</p>
            </C.Container>
        )
    } else if (category && subcategory) {
        return (
            <C.Container colorTitle={state.theme.theme.colorTitle} colorPrimary={category.color}>
                <p className='text-nowrap' >{category.name + ' > ' + subcategory.name}</p>
            </C.Container>
        )
    } else if (account) {
        return (
            <C.Container colorTitle={state.theme.theme.colorTitle} colorPrimary={account.color}>
                <p className='text-nowrap' >{account.description}</p>
            </C.Container>
        )
    } else {
        return (
            <></>
        )
    }
}