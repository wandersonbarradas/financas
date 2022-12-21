import * as C from './Accounts.styled'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/context';
import AddIcon from '@mui/icons-material/Add';
import { AccountItem } from '../../components/accountItem/AccountItem';
import Api from '../../Api';
import { AccountType, UserAccountType } from '../../types/AccountsType';
import { Modal } from '../../components/modais/Modais';
import { ModalNewAccount } from '../../components/ModalNewAccount/ModalNewAccount';

export const Account = () => {
    const { state } = useContext(Context)
    const [accounts, setAccounts] = useState<UserAccountType[]>([])
    const [publicAccounts, setpublicAccounts] = useState<AccountType[]>([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        getAccounts()
        getPublicAccounts()
    }, []);

    const getAccounts = async () => {
        if (state.user.data === null) {
            return;
        }
        const result = await Api.getUserDocument(state.user.data.id, 'accounts') as { accounts: UserAccountType[] }
        if (result) {
            setAccounts(
                result.accounts.sort((a, b) => {
                    return b.id - a.id
                })
            )
        }
    }

    const getPublicAccounts = async () => {
        const accounts = await Api.getAccountsPublic() as AccountType[]
        if (accounts) {
            setpublicAccounts(accounts)
        }
    }

    return (
        <C.Container Theme={state.theme.theme}>
            <div className='header'>
                <h1>Contas</h1>
                <div className='actions'>
                    <div onClick={() => setOpen(true)} className='icon'>
                        <AddIcon />
                    </div>
                </div>
            </div>
            <div className='body'>
                <div className='box-account'>
                    {accounts.map((item, index) => (
                        <AccountItem getAccounts={getAccounts} publicAccounts={publicAccounts} Account={item} key={index} />
                    ))}
                </div>
            </div>
            <Modal modalOpacity={0.5} open={open} setOpen={setOpen}>
                <ModalNewAccount getAccount={getAccounts} id={accounts[0]?.id ? accounts[0]?.id + 1 : 1} accounts={publicAccounts} setOpen={setOpen} />
            </Modal>
        </C.Container >
    )
}