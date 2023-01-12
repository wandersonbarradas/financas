import { NormalTansactionType } from '../../types/TransactionType';
import * as C from './ListTransactionsMobile.styled'
import { Context } from '../../context/context';
import { useContext, useEffect } from 'react';
import formattedPrice from '../../helpers/FormattedPrice';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    item: NormalTansactionType;
}

export const ListTransactionsMobile = ({ item }: Props) => {
    const { state } = useContext(Context)

    useEffect(() => {
        console.log(item.subcategory)
    }, []);
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