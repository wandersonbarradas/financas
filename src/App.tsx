import * as C from './app.styled'
import { SideBar } from './components/sidebar/sidebar';
import { MainRouter, LoginRouter } from './routers/MainRouter';
import { Context } from './context/context'
import { useContext, useState, useEffect } from 'react'
import { Dark, Light } from './reducers/ThemeReducer';
import { ModalExpense } from './components/modalExpense/ModalExpense';
import Api from './Api'
import Cookies from 'js-cookie';
import { DataType, UserType } from './types/UserType';
import { Loader } from './components/loader/Loader';
import { Header } from './components/header/Header';
const App = () => {
    const { state, dispatch } = useContext(Context)
    const [modalTransactions, setModalTransactions] = useState(false)
    const [newExpense, setNewExpense] = useState(false)
    const [newIncome, setNewIncome] = useState(false)
    const [newTransfer, setNewTransfer] = useState(false)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        handleGetLogin()
        getCookies()
    }, [])

    useEffect(() => {
        console.log(state.general.sideBar)
    }, [state.general])

    const showLoader = (value: boolean) => {
        setLoader(value)
    }

    const setNewUser = (value: DataType | null,) => {
        dispatch({
            type: 'setData',
            payload: { data: value }
        })
        setLoader(false)
    }

    const handleGetLogin = () => {
        setLoader(true)
        Api.getToken(setNewUser)
    }

    const hendleModalTrasactions = (value?: boolean, type?: 'income' | 'expense' | 'transfer') => {
        if (value) {
            setModalTransactions(true)
            switch (type) {
                case 'income':
                    setNewExpense(false)
                    setNewTransfer(false)
                    setNewIncome(value)
                    break;
                case 'expense':
                    setNewIncome(false)
                    setNewTransfer(false)
                    setNewExpense(value)
                    break;
                case 'transfer':
                    setNewIncome(false)
                    setNewExpense(false)
                    setNewTransfer(value)
                    break;
                default:
                    setModalTransactions(false)
                    setNewIncome(false)
                    setNewExpense(false)
                    setNewTransfer(false)
            }
        } else {
            setModalTransactions(false)
            setNewIncome(false)
            setNewExpense(false)
            setNewTransfer(false)
        }
    }

    const getCookies = () => {
        const theme = Cookies.get('theme')
        const sidebar = Cookies.get('sidebar')
        if (theme) {
            dispatch({
                type: 'setTheme',
                payload: { status: theme, theme: theme === 'Light' ? Light : Dark }
            })
        }
        if (sidebar) {
            dispatch({
                type: 'setSideBar',
                payload: { sideBar: +sidebar > 0 ? true : false }
            })
        }
    }

    if (loader) {
        return (
            <Loader />
        )
    } else {
        return (
            <>
                {!state.user.data &&
                    <LoginRouter />
                }
                {state.user.data &&
                    <C.Container Theme={state.theme.theme}>
                        <SideBar showLoader={showLoader} />
                        <main className='main'>
                            <Header showLoader={showLoader} />
                            <MainRouter handleModal={hendleModalTrasactions} />
                        </main>
                        {modalTransactions &&
                            <div className='container-modal-transactions'>
                                {newExpense ? <ModalExpense handleModal={hendleModalTrasactions} /> : ''}
                            </div>
                        }
                    </C.Container>
                }
            </>
        )
    }


}

export default App;
