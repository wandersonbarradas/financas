import * as C from './app.styled'
import { SideBar } from './components/sidebar/sidebar';
import { MainRouter, LoginRouter } from './routers/MainRouter';
import { Context } from './context/context'
import { useContext, useState, useEffect } from 'react'
import { Dark, Light } from './reducers/ThemeReducer';
import { ModalExpense } from './components/modalExpense/ModalExpense';
import Api from './Api'
import Cookies from 'js-cookie';
import { UserType } from './types/UserType';
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
        getTheme()
    }, [])

    // useEffect(() => {
    //     console.log(state.user)
    // }, [state.user])

    const showLoader = (value: boolean) => {
        setLoader(value)
    }

    const setNewUser = (value: UserType | null,) => {
        dispatch({
            type: 'setUser',
            payload: { user: value }
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
    const handleTheme = () => {
        if (state.theme.status === 'Light') {
            dispatch({
                type: 'setTheme',
                payload: { status: 'Dark', theme: Dark }
            })
            Cookies.set("theme", 'Dark', { expires: 999 });
        } else {
            dispatch({
                type: 'setTheme',
                payload: { status: 'Light', theme: Light }
            })
            Cookies.set("theme", 'Light', { expires: 999 });
        }
    }

    const getTheme = () => {
        const theme = Cookies.get('theme')
        if (theme) {
            dispatch({
                type: 'setTheme',
                payload: { status: theme, theme: theme === 'Light' ? Light : Dark }
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
                {!state.user &&
                    <LoginRouter />
                }
                {state.user &&
                    <C.Container Theme={state.theme.theme}>
                        <button className='btn-switch-theme' onClick={handleTheme}>Theme {state.theme.status}</button>
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
