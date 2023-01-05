import { useContext, useState, useEffect } from 'react'
import { Context } from '../../context/context'
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import * as C from './ModalNewAccount.styled'
import IconBank from '../../assets/museum.png'
import { SelectAccounts } from '../selectAccounts/selectAccounts';
import { AccountType, UserAccountType } from '../../types/AccountsType';
import Api from '../../Api';

type Props = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    accounts: AccountType[];
    id: number;
    getAccount: () => Promise<void>;
    item?: UserAccountType | null;
}

export const ModalNewAccount = ({ setOpen, accounts, id, getAccount, item }: Props) => {
    const { state } = useContext(Context)
    const [valueAccount, setValueAccount] = useState<number>(0)
    const [descriptionAccount, setDescriptionAccount] = useState<string>('')
    const [colorAccount, setColorAccount] = useState<string>(state.theme.theme.colorPrimary)
    const [openMod, setOpenMod] = useState(false)
    const [opacity, setOpacity] = useState(0)
    const [accountItem, setAccountItem] = useState<AccountType | null>(null)
    const [disabled, setDisabled] = useState<boolean>(true)
    useEffect(() => {
        checkValues()
        if (accountItem) {
            setColorAccount(item?.color ?? accountItem.color)
        }
    }, [descriptionAccount, accountItem]);

    useEffect(() => {
        if (item) {
            setAccountItem(item.account)
            setValueAccount(item.value)
            setDescriptionAccount(item.description)
            setColorAccount(item.color)
        }
    }, []);

    const handleFocusInputArea = (e: React.MouseEvent<HTMLElement>) => {
        const element = e.currentTarget as HTMLDivElement;
        if (element.classList.contains('focus')) {
            return;
        }
        document.querySelector('.inputArea.focus')?.classList.remove('focus')
        element.classList.add('focus')
    }

    const handleInstitution = (e: React.MouseEvent<HTMLElement>) => {
        handleFocusInputArea(e)
        setOpenMod(true)
        setTimeout(() => {
            setOpacity(1)
        }, 225)
    }

    const closeMod = () => {
        setOpacity(0)
        setTimeout(() => {
            setOpenMod(false)
        }, 225)
    }

    const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueAccount(+e.currentTarget.value)
    }

    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescriptionAccount(e.currentTarget.value)
    }

    const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColorAccount(e.currentTarget.value)
    }

    const checkValues = () => {
        if (descriptionAccount !== '' && accountItem !== null) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    const handleBtnSave = async () => {
        if (state.user.data === null) {
            return
        }
        if (disabled === true) {
            return
        }
        const account: UserAccountType = {
            id: id,
            account: accountItem as AccountType,
            color: colorAccount,
            description: descriptionAccount,
            value: valueAccount,
        }
        setDisabled(true)
        await Api.setUserAccount(state.user.data.id, account)
        getAccount()
        setOpen(false)
    }

    const handleBtnEdit = async () => {
        if (state.user.data === null) {
            return
        }
        if (disabled === true) {
            return
        }
        if (!item) {
            return
        }
        setDisabled(true)
        await Api.removeUserAccount(state.user.data.id, item)
        const account: UserAccountType = {
            id: item.id,
            account: accountItem as AccountType,
            color: colorAccount,
            description: descriptionAccount,
            value: valueAccount,
        }
        await Api.setUserAccount(state.user.data.id, account)
        getAccount()
        setOpen(false)
    }

    return (
        <C.Container Theme={state.theme.theme}>
            {!item &&
                <>
                    <div className='headerModalAccount'>
                        <h3>Nova conta</h3>
                        <div onClick={() => setOpen(false)} className='icon'>
                            <CloseIcon />
                        </div>
                    </div>
                    <div className='bodyModalAccount'>
                        <div className='inputArea value' onClick={handleFocusInputArea}>
                            <span>R$</span>
                            <input type="number" placeholder='0,00' id='inputValueAccount'
                                onChange={handleValue} />
                        </div>
                        <div className='inputArea institution' onClick={handleInstitution}>
                            <div className='boxImg'>
                                <img src={accountItem?.imgUrl ?? IconBank} alt="" />
                            </div>
                            <div className='selectInstitution'>
                                <span className='label'>{accountItem?.name ?? 'Selecione seu banco'}</span>
                                <div className='icon'>
                                    <KeyboardArrowRightIcon />
                                </div>
                            </div>
                        </div>
                        <div className='inputArea description' onClick={handleFocusInputArea}>
                            <div className='icon'>
                                <DescriptionOutlinedIcon />
                            </div>
                            <input onChange={handleDescription} type="text" placeholder='Descrição' id='inputDescriptionAccount' />
                        </div>
                        <div className='inputAreaColor' >
                            <label htmlFor="inputColorAccount" onClick={handleFocusInputArea}>
                                <div className='icon'>
                                    <ColorLensOutlinedIcon />
                                </div>
                                Cor da conta
                                <div className='boxColorAccount'>
                                    <input value={colorAccount} onInput={handleColor} type="color" id='inputColorAccount' />
                                </div>
                            </label>

                        </div>
                    </div>
                    <div className='footerModalAccount'>
                        <button onClick={() => setOpen(false)} >Cancelar</button>
                        <button onClick={handleBtnSave} disabled={disabled} >Salvar</button>
                    </div>
                </>
            }{item &&
                <>
                    <div className='headerModalAccount'>
                        <h3>Editando conta</h3>
                        <div onClick={() => setOpen(false)} className='icon'>
                            <CloseIcon />
                        </div>
                    </div>
                    <div className='bodyModalAccount'>
                        <div className='inputArea value' onClick={handleFocusInputArea}>
                            <span>R$</span>
                            <input type="number" value={valueAccount} placeholder='0,00' id='inputValueAccount'
                                onChange={handleValue} />
                        </div>
                        <div className='inputArea institution' onClick={handleInstitution}>
                            <div className='boxImg'>
                                <img src={accountItem?.imgUrl ?? IconBank} alt="" />
                            </div>
                            <div className='selectInstitution'>
                                <span className='label'>{accountItem?.name ?? 'Selecione seu banco'}</span>
                                <div className='icon'>
                                    <KeyboardArrowRightIcon />
                                </div>
                            </div>
                        </div>
                        <div className='inputArea description' onClick={handleFocusInputArea}>
                            <div className='icon'>
                                <DescriptionOutlinedIcon />
                            </div>
                            <input onChange={handleDescription} value={descriptionAccount} type="text" placeholder='Descrição' id='inputDescriptionAccount' />
                        </div>
                        <div className='inputAreaColor' >
                            <label htmlFor="inputColorAccount" onClick={handleFocusInputArea}>
                                <div className='icon'>
                                    <ColorLensOutlinedIcon />
                                </div>
                                Cor da conta
                                <div className='boxColorAccount'>
                                    <input value={colorAccount} onInput={handleColor} type="color" id='inputColorAccount' />
                                </div>
                            </label>

                        </div>
                    </div>
                    <div className='footerModalAccount'>
                        <button onClick={() => setOpen(false)} >Cancelar</button>
                        <button onClick={handleBtnEdit} disabled={disabled} >Salvar</button>
                    </div>
                </>
            }
            {openMod &&
                <C.ContainerModal opacity={opacity} >
                    <SelectAccounts setAccountItem={setAccountItem} accounts={accounts} closeMod={closeMod} />
                </C.ContainerModal>
            }
        </C.Container>
    )
}