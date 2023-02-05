import * as C from './app.styled'
import { SideBar } from './components/sidebar/sidebar';
import { MainRouter, LoginRouter } from './routers/MainRouter';
import { Context } from './context/context'
import { useContext, useEffect } from 'react'
import { Dark, Light } from './reducers/ThemeReducer';
import Api, { AllDataType } from './Api'
import Cookies from 'js-cookie';
import { CategoryType, DataType, SubCategories } from './types/UserType';
import { Loader } from './components/loader/Loader';
import { Header } from './components/header/Header';
import { NormalTansactionType, TransferTansactionType } from './types/TransactionType';
import { UserAccountType } from './types/AccountsType';
const App = () => {
    const { state, dispatch } = useContext(Context)

    useEffect(() => {
        handleGetLogin()
        getCookies()
        dispatch({
            type: 'setSelectedDate',
            payload: { selectedDate: new Date() }
        })
    }, [])

    const showLoader = (value: boolean) => {
        dispatch({
            type: 'setLoader',
            payload: { loader: value }
        })
    }

    const getDataUser = async (id: string | undefined) => {
        if (id === undefined) {
            return;
        }
        const resultUser = await Api.fetchAllData(id) as AllDataType;
        if (resultUser.transactions) {
            dispatch({
                type: 'setTransactions',
                payload: { transactions: resultUser.transactions }
            })
        }
        if (resultUser.categories) {
            dispatch({
                type: 'setCategories',
                payload: { categories: resultUser.categories }
            })
        }
        if (resultUser.subcategories) {
            dispatch({
                type: 'setSubCategories',
                payload: { subcategories: resultUser.subcategories }
            })
        }
        if (resultUser.accounts) {
            dispatch({
                type: 'setAccounts',
                payload: { accounts: resultUser.accounts }
            })
        }
    }

    const setNewUser = async (value: DataType | null,) => {
        dispatch({
            type: 'setData',
            payload: { data: value }
        })
        await getDataUser(value?.id)
        dispatch({
            type: 'setLoader',
            payload: { loader: false }
        })
    }

    const handleGetLogin = () => {
        dispatch({
            type: 'setLoader',
            payload: { loader: true }
        })
        Api.getToken(setNewUser)
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

    if (state.general.loader) {
        return (
            <Loader />
        )
    } else {
        return (
            <div>
                {!state.user.data &&
                    <LoginRouter />
                }
                {state.user.data &&
                    <C.Container Theme={state.theme.theme}>
                        <SideBar showLoader={showLoader} />
                        <main className='main scroll'>
                            <Header showLoader={showLoader} />
                            <MainRouter />
                        </main>
                    </C.Container>
                }
            </div>
        )
    }


}

export default App;
