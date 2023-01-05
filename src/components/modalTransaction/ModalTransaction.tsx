import { useContext, useState, useEffect } from 'react'
import { Context } from '../../context/context'
import CloseIcon from '@mui/icons-material/CloseOutlined';
import EventIcon from '@mui/icons-material/EventOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SubdirectoryArrowRightOutlinedIcon from '@mui/icons-material/SubdirectoryArrowRightOutlined';
import { Calendario } from '../calendar/Calendar';
import * as C from './ModalTransaction.styled'
import DF from '../../helpers/DateFunctions';
import dayjs from "dayjs";
import { ModalExpenseCatItem } from '../modalExpenseCatItem/ModalExpenseCatItem';
import Api from '../../Api';
import { UserAccountType } from '../../types/AccountsType';
import { CategoryType, SubCategories } from '../../types/UserType';
import { Modal } from '../modais/Modais';
import { NormalTansactionType, TransferTansactionType } from '../../types/TransactionType';

type Props = {
    type: 'expense' | 'income' | 'transfer';
    setClose: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalTransaction = (props: Props) => {
    const { state, dispatch } = useContext(Context)
    const [valueExpense, setValueExpense] = useState<number>(0)
    const [description, setDescription] = useState<string>('')
    const [modalDatePicker, setModalDatePiker] = useState<boolean>(false)
    const [category, setCategory] = useState<CategoryType | null>(null)
    const [subcategory, setSubCategory] = useState<SubCategories | null>(null)
    const [account, setAccount] = useState<UserAccountType | null>(null)
    const [accountFor, setAccountFor] = useState<UserAccountType | null>(null)
    const [dateExpense, setDateExpense] = useState<Date>(new Date())
    const [dateExtense, setDateExtense] = useState<boolean>(false)
    const [done, setDone] = useState<boolean>(true)
    const [colorTransaction, setColorTransaction] = useState({ solid: '', rgba: '' })
    const [valueCategory, setValueCategory] = useState('')
    const [disabledBtn, setDisabeldBtn] = useState(true)
    const [categories, setCategories] = useState<CategoryType[]>([])
    const [subcategories, setSubcategories] = useState<SubCategories[]>([])
    const [accounts, setAccounts] = useState<UserAccountType[]>([])
    const [modalCategories, setModalCategories] = useState(false)
    const [modalAccount, setModalAccount] = useState(false)
    const [modalAccountFor, setModalAccountFor] = useState(false)

    useEffect(() => {
        switch (checkDate()) {
            case 'hoje':
                backgroundBtnDate(0)
                setDateExtense(false)
                setDone(true)
                break;
            case 'ontem':
                backgroundBtnDate(1)
                setDateExtense(false)
                setDone(true)
                break;
            case 'outros':
                backgroundBtnDate(2)
                setDateExtense(true)
                dateExpense > new Date() ? setDone(false) : setDone(true)
        }
    }, [dateExpense])

    useEffect(() => {
        if (props.type === 'expense') {
            setColorTransaction({ solid: state.theme.theme.expenseColor, rgba: 'rgba(240, 41, 39, 0.38)' })
        } else if (props.type === 'income') {
            setColorTransaction({ solid: state.theme.theme.incomeColor, rgba: 'rgba(79, 209, 139, 0.38)' })
        } else {
            setColorTransaction({ solid: state.theme.theme.transferColor, rgba: 'rgba(0, 141, 255, 0.38)' })
        }
        getCategory()
    }, []);

    useEffect(() => {
        if (props.type === 'transfer') {
            if (valueExpense !== 0 && description !== '' && account !== null && accountFor !== null) {
                setDisabeldBtn(false)
            } else {
                setDisabeldBtn(true)
            }
        } else {
            if (valueExpense !== 0 && description !== '' && category !== null && account !== null) {
                setDisabeldBtn(false)
            } else {
                setDisabeldBtn(true)
            }
        }

    }, [valueExpense, description, category, account, accountFor]);

    const getCategory = async () => {
        if (state.user.data === null) {
            return;
        }
        const resultCat = await Api.getUserDocument(state.user.data.id, 'categories') as { categories: CategoryType[] }
        const catFilter = resultCat.categories.filter(item => item.type === props.type)
        catFilter.sort((a, b) => {
            if (a.name < b.name) {
                return -1
            } else {
                return 1
            }
        })
        setCategories(catFilter)
        const resultSubcat = await Api.getUserDocument(state.user.data.id, 'subcategories') as { subcategories: SubCategories[] }
        resultSubcat.subcategories.sort((a, b) => {
            if (a.name < b.name) {
                return -1
            } else {
                return 1
            }
        })
        setSubcategories(resultSubcat.subcategories)
        if (state.user.accounts) {
            const banks = state.user.accounts
            banks.sort((a, b) => {
                if (a.description < b.description) {
                    return -1
                } else {
                    return 1
                }
            })
            setAccounts(banks)
        }

    }

    const getNewIdTransaction = () => {
        const transactions = state.user.transactions;
        if (transactions.length > 0) {
            transactions.sort((a, b) => b.id - a.id)
            return transactions[0].id + 1
        }
        return 1;
    }

    const createTransaction = async () => {
        if (state.user.data === null) {
            return
        }
        const id = getNewIdTransaction()
        const userId = state.user.data.id
        if (props.type === 'transfer') {
            if (account === null || accountFor === null) {
                return
            }
            setDisabeldBtn(true)
            const transaction = {
                id,
                type: props.type,
                value: valueExpense,
                date: dateExpense,
                description: description,
                account,
                accountFor,
                done: true,
            }
            await Api.setTransaction(userId, transaction)
            // attValueBank(account, valueExpense, props.type, accountFor)
        } else {
            if (account === null || category === null) {
                return
            }
            setDisabeldBtn(true)
            const transaction = {
                id,
                type: props.type,
                value: valueExpense,
                date: dateExpense,
                description: description,
                category,
                subcategory,
                account,
                done
            }
            await Api.setTransaction(userId, transaction)
            // attValueBank(account, valueExpense, props.type)
        }
        const transactionsResult = await Api.getUserDocument(userId, 'transactions') as { transactions: NormalTansactionType[] | TransferTansactionType[] }
        dispatch({
            type: 'setTransactions',
            payload: { transactions: transactionsResult.transactions }
        })
        props.setClose(false)
    }

    const handleDateExpense = (date: Date) => {
        setDateExpense(date)
    }

    const handleModalDatePicker = (value: 'open' | 'close') => {
        if (value === 'open') {
            setModalDatePiker(true)
        } else {
            setModalDatePiker(false)
        }
    }

    const handleContainerDatePiker = (e: React.MouseEvent<HTMLElement>) => {
        const el = e.target as HTMLElement
        if (el.classList.contains('modalDatePicker')) {
            handleModalDatePicker('close')
        }
    }

    const handleFocusInputArea = (e: React.MouseEvent<HTMLElement>) => {
        const element = e.currentTarget as HTMLDivElement;
        document.querySelector('.input-area.focus')?.classList.remove('focus')
        if (element.classList.contains('focus')) {
            return;
        }
        element.classList.add('focus')
    }

    const handleBtnDate = (e: React.MouseEvent<HTMLElement>) => {
        handleFocusInputArea(e)
        let element = e.target as HTMLElement
        const ontem = dayjs().subtract(1, 'day')
        if (element.innerText === 'Hoje') {
            setDateExpense(new Date())
        } else if (element.innerText === 'Ontem') {
            setDateExpense(new Date(ontem.year(), ontem.month(), ontem.date()))
        } else {
            handleModalDatePicker('open')
        }
    }

    const checkDate = () => {
        const date = dayjs(dateExpense).format('DD/MM/YYY')
        const hj = dayjs(new Date()).format('DD/MM/YYY')
        const ontem = dayjs(new Date()).subtract(1, 'day').format('DD/MM/YYY')
        if (date === hj) {
            return 'hoje'
        } else if (date === ontem) {
            return 'ontem'
        } else {
            return 'outros'
        }
    }

    const backgroundBtnDate = (btnIndex: number) => {
        let items: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.btn-date')
        if (items.length <= 0) {
            return false
        }
        items.forEach((item, index) => {
            item.classList.remove('select-btn-date')
            if (btnIndex !== null && index === btnIndex) {
                item.classList.add('select-btn-date')
            }
        })
    }

    const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueExpense(+e.currentTarget.value)
    }

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) {
            setDone(true)
        } else {
            setDone(false)
        }
    }

    const handleInputCategory = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Backspace') {
            setCategory(null)
        }
    }

    const handleInputAccount = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Backspace') {
            setAccount(null)
        }
    }

    const handleInputAccountFor = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Backspace') {
            setAccountFor(null)
        }
    }

    const handleAccountItem = (item: UserAccountType) => {
        setAccount(item)
        setModalAccount(false)
    }

    const handleAccountForItem = (item: UserAccountType) => {
        setAccountFor(item)
        setModalAccountFor(false)
    }

    const handleCategory = (item: CategoryType) => {
        setCategory(item)
        setModalCategories(false)
    }

    const handleSubCategory = (item: SubCategories) => {
        setSubCategory(item)
        const cat = categories.filter(i => i.id === item.category)
        setCategory(cat[0])
        setModalCategories(false)
    }

    const handleVerificDescription = (item: string) => {
        verificDescription(item)
    }

    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.currentTarget.value)
    }

    const verificDescription = (item: string) => {
        switch (item) {
            case 'description':
                let a = document.getElementById('input-description-expense') as HTMLInputElement
                if (!a) {
                    return
                }
                if (description === '') {
                    a.parentElement?.classList.add('warning', 'colorWarning')
                    if (props.type === 'transfer') {
                        a.parentElement?.parentElement?.classList.add('tf')
                    }
                } else {
                    a.parentElement?.classList.remove('warning', 'colorWarning')
                    if (props.type === 'transfer') {
                        a.parentElement?.parentElement?.classList.remove('tf')
                    }
                }
                break;
            case 'value':
                let b = document.getElementById('input-value-expense') as HTMLInputElement;
                if (!b) {
                    return
                }
                if (valueExpense <= 0) {
                    b.parentElement?.classList.add('warning', 'colorWarning', 'valueWarning')
                } else {
                    b.parentElement?.classList.remove('warning', 'colorWarning', 'valueWarning')
                }
                break;
            case 'category':
                setModalCategories(false)
                let c = document.getElementById('input-category-expense') as HTMLInputElement;
                if (!c) {
                    return
                }
                if (category === null) {
                    c.parentElement?.parentElement?.classList.add('warning', 'colorWarning')
                } else {
                    c.parentElement?.parentElement?.classList.remove('warning', 'colorWarning')
                }
                break;
            case 'account':
                setModalAccount(false)
                let d = document.getElementById('input-account-expense') as HTMLInputElement;
                if (!d) {
                    return
                }
                if (category === null) {
                    d.parentElement?.parentElement?.classList.add('warning', 'colorWarning')
                } else {
                    d.parentElement?.parentElement?.classList.remove('warning', 'colorWarning')
                }
                break;
            case 'accountFor':
                setModalAccountFor(false)
                let e = document.getElementById('input-account-for-expense') as HTMLInputElement;
                if (!e) {
                    return
                }
                if (category === null) {
                    e.parentElement?.parentElement?.classList.add('warning', 'colorWarning')
                } else {
                    e.parentElement?.parentElement?.classList.remove('warning', 'colorWarning')
                }
                break;
        }
    }


    return (
        <C.Container colorTransaction={colorTransaction} extend={dateExtense} Theme={state.theme.theme}>
            {modalDatePicker &&
                <div className='modalDatePicker' onClick={handleContainerDatePiker}>
                    <Calendario value={dateExpense} dateValue={handleDateExpense} handleModal={handleModalDatePicker} />
                </div>
            }
            <div className='header'>
                <h3>Nova {props.type === 'expense' ? 'Despesa' : props.type === 'income' ? 'Receita' : 'Transferência'}</h3>
                <div onClick={() => props.setClose(false)} className='icon'>
                    <CloseIcon />
                </div>
            </div>
            <div className='body'>
                <div className='left-side'>
                    <div className='input-area date' onClick={handleBtnDate}>
                        <div className='icon'>
                            <EventIcon />
                        </div>
                        <button className='btn-date' >Hoje</button>
                        <button className='btn-date' >Ontem</button>
                        <button className='btn-date' onClick={() => handleModalDatePicker('open')} >Outro...</button>
                        <span className='date-extense'>{DF.getDateExtense(dateExpense)}</span>
                    </div>
                    <label htmlFor="input-value-expense">
                        <div className='input-area value' onClick={handleFocusInputArea}>
                            <div className='icon'>
                                <AttachMoneyOutlinedIcon />
                            </div>
                            <span>R$</span>
                            <input onBlur={() => handleVerificDescription('value')} type="number" placeholder='0,00' id='input-value-expense'
                                onChange={handleValue} />
                        </div>
                    </label>
                    {props.type !== 'transfer' &&
                        <label className='checkArea' htmlFor="toggle-switch" onClick={handleFocusInputArea}>
                            <div className='leftArea'>
                                <div className='icon'>
                                    <TaskAltOutlinedIcon />
                                </div>
                                <span>{props.type === 'expense' ? done ? 'Foi pago' : 'Não foi pago' : done ? 'Foi recebido' : 'Não foi recebido'}</span>
                            </div>
                            <div className='rightArea'>
                                <div className="cl-toggle-switch">
                                    <label className="cl-switch">
                                        <input id='toggle-switch' type="checkbox"
                                            checked={done}
                                            onChange={handleCheck} />
                                        <span></span>
                                    </label>
                                </div>
                            </div>
                        </label>
                    }
                    <label htmlFor="input-description-expense">
                        <div className='input-area description' onClick={handleFocusInputArea}>
                            <div className='icon'>
                                <DescriptionOutlinedIcon />
                            </div>
                            <input onBlur={() => handleVerificDescription('description')} type="text" placeholder='Descrição' id='input-description-expense'
                                onChange={handleDescription} />
                        </div>
                    </label>
                    {props.type !== 'transfer' &&
                        <label htmlFor="input-category-expense" onClick={() => setModalCategories(true)}>
                            <div className='input-area category' onClick={handleFocusInputArea}>
                                <div className='icon'>
                                    <BookmarksOutlinedIcon />
                                </div>
                                <div className='content'>
                                    {subcategory && category &&
                                        <ModalExpenseCatItem category={category} subcategory={subcategory} />
                                    }{!subcategory && category &&
                                        <ModalExpenseCatItem category={category} />
                                    }{!category &&
                                        <input
                                            onBlur={() => handleVerificDescription('category')}
                                            onFocus={() => setModalCategories(true)}
                                            type="text"
                                            placeholder={category ? '' : 'Categoria'} id='input-category-expense'
                                            onKeyDown={handleInputCategory}
                                            onChange={(e) => setValueCategory('')}
                                            value={valueCategory}
                                        />
                                    }
                                    <div className={modalCategories ? 'icon rot' : 'icon'}>
                                        <ExpandMoreOutlinedIcon />
                                    </div>
                                </div>
                            </div>
                        </label>
                    }
                    <label htmlFor="input-account-expense" onClick={() => setModalAccount(true)}>
                        <div className='input-area account' onClick={handleFocusInputArea}>
                            <div className='icon'>
                                <AccountBalanceOutlinedIcon />
                            </div>
                            <div className='content'>
                                {account &&
                                    <ModalExpenseCatItem account={account} />
                                }{!account &&
                                    <input
                                        onBlur={() => handleVerificDescription('account')}
                                        onFocus={() => setModalAccount(true)}
                                        type="text"
                                        placeholder={account ? '' : props.type === 'transfer' ? 'De' : 'Account'}
                                        id='input-account-expense'
                                        onKeyDown={handleInputAccount}
                                        onChange={(e) => setValueCategory('')}
                                        value={valueCategory}
                                    />
                                }
                                <div className={modalAccount ? 'icon rot' : 'icon'}>
                                    <ExpandMoreOutlinedIcon />
                                </div>
                            </div>
                        </div>
                    </label>
                    {props.type === 'transfer' &&
                        <label htmlFor="input-account-for-expense" onClick={() => setModalAccount(true)}>
                            <div className='input-area account' onClick={handleFocusInputArea}>
                                <div className='icon'>
                                    <AccountBalanceOutlinedIcon />
                                </div>
                                <div className='content'>
                                    {accountFor &&
                                        <ModalExpenseCatItem account={accountFor} />
                                    }{!accountFor &&
                                        < input
                                            onBlur={() => handleVerificDescription('accountFor')}
                                            onFocus={() => setModalAccountFor(true)}
                                            type="text"
                                            placeholder={accountFor ? '' : 'Para'}
                                            id='input-account-for-expense'
                                            onKeyDown={handleInputAccountFor}
                                            onChange={() => setValueCategory('')}
                                            value={valueCategory}
                                        />
                                    }
                                    <div className={modalAccount ? 'icon rot' : 'icon'}>
                                        <ExpandMoreOutlinedIcon />
                                    </div>
                                </div>
                            </div>
                        </label>
                    }
                </div>
            </div>
            <div className='footerModalTransaction'>
                {props.type === 'transfer' &&
                    <button onClick={createTransaction} disabled={disabledBtn} >Salvar</button>
                }{props.type !== 'transfer' &&
                    <button onClick={createTransaction} disabled={disabledBtn} >Salvar</button>
                }
            </div>
            <Modal clickAway={true} modalOpacity={0.5} open={modalAccount} setOpen={setModalAccount}>
                <div className='containerAccounts'>
                    {accounts.map((item, index) => (
                        <C.AccountItem key={index} onClick={() => handleAccountItem(item)} Theme={state.theme.theme} >
                            <img src={item.account.imgUrl} alt="" />
                            <span>{item.description}</span>
                        </C.AccountItem>
                    ))}
                </div>
            </Modal>
            <Modal clickAway={true} modalOpacity={0.5} open={modalAccountFor} setOpen={setModalAccountFor}>
                <div className='containerAccounts'>
                    {accounts.map((item, index) => (
                        <C.AccountItem key={index} onClick={() => handleAccountForItem(item)} Theme={state.theme.theme} >
                            <img src={item.account.imgUrl} alt="" />
                            <span>{item.description}</span>
                        </C.AccountItem>
                    ))}
                </div>
            </Modal>
            <Modal clickAway={true} modalOpacity={0.5} open={modalCategories} setOpen={setModalCategories}>
                <div className='containerAccounts'>
                    {categories.map((item, index) => (
                        <>
                            <C.CategoryItem key={index} onClick={() => handleCategory(item)} color={item.color} Theme={state.theme.theme} >
                                <div className='color'></div>
                                <span>{item.name}</span>
                            </C.CategoryItem>
                            {subcategories.filter(i => i.category === item.id).map((e, ei) => (
                                <C.CategoryItem key={index + ei} onClick={() => handleSubCategory(e)} color={e.color} Theme={state.theme.theme} >
                                    <div className='icon'>
                                        <SubdirectoryArrowRightOutlinedIcon fontSize='medium' />
                                    </div>
                                    <div className='color sub'></div>
                                    <span className='sub'>{e.name}</span>
                                </C.CategoryItem>
                            ))}
                        </>
                    ))}
                </div>
            </Modal>
        </C.Container >
    )
}