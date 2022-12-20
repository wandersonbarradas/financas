import * as C from './selectAccounts.styled'
import { useContext } from 'react'
import { Context } from '../../context/context'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { AccountType } from '../../types/AccountsType';

type Props = {
    closeMod: () => void;
    accounts: AccountType[]
    setAccountItem: React.Dispatch<React.SetStateAction<AccountType | null>>;
}

export const SelectAccounts = ({ closeMod, accounts, setAccountItem }: Props) => {
    const { state } = useContext(Context)

    const setAccount = (item: AccountType) => {
        setAccountItem(item)
        closeMod()
    }
    return (
        <C.Container Theme={state.theme.theme}>
            <div className='headerSelectAccounts'>
                <h3>Selecione seu banco</h3>
                <div onClick={closeMod} className="icon">
                    <CloseOutlinedIcon />
                </div>
            </div>
            <div className='searchArea'>
                <div className='content'>
                    <div className="icon"><SearchOutlinedIcon /></div>
                    <input placeholder='Pesquise por bancos' type="text" />
                </div>
            </div>
            <div className='bodySelectAccounts scroll' >
                {accounts.map((item, index) => (
                    <div key={index} onClick={() => setAccount(item)} className='selectItem'>
                        <div className='img'>
                            <img src={item.imgUrl} alt="" />
                        </div>
                        <p>{item.name}</p>
                    </div>
                ))}

            </div>
        </C.Container>
    )
}