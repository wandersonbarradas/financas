import { NormalTansactionType, TransferTansactionType } from '../../types/TransactionType';
import * as C from './ListTransactionsMobile.styled'
import { Context } from '../../context/context';
import { useContext } from 'react';
import formatted from '../../helpers/FormattedPrice';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    item: NormalTansactionType;
    Click: (item: NormalTansactionType | TransferTansactionType) => void;
}

export const ListTransactionsMobile = ({ item, Click }: Props) => {
    const { state } = useContext(Context)

    return (
        <C.Container color='' ColorCategory={item.type === 'transfer' ? state.theme.theme.transferColor : item.category.color} Theme={state.theme.theme} onClick={() => Click(item)}>
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
                <span className={`transactionValue ` + item.type}>{formatted.format(item.value)}</span>
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