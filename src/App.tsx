import * as C from './app.styled'
import { SideBar } from './components/sidebar/sidebar';
import { MainRouter, LoginRouter } from './routers/MainRouter';
import { Context } from './context/context'
import { useContext, useEffect } from 'react'
import { Dark, Light } from './reducers/ThemeReducer';
import Api from './Api'
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
        const transactions = await Api.getUserDocument(id, 'transactions') as { transactions: NormalTansactionType[] | TransferTansactionType[] }
        dispatch({
            type: 'setTransactions',
            payload: { transactions: transactions.transactions }
        })
        const categoriesResult = (await Api.getUserDocument(
            id,
            "categories",
        )) as {
            categories: CategoryType[];
        };
        dispatch({
            type: 'setCategories',
            payload: { categories: categoriesResult.categories }
        })
        const subcategoriesResult = (await Api.getUserDocument(
            id,
            "subcategories",
        )) as {
            subcategories: SubCategories[];
        };
        dispatch({
            type: 'setSubCategories',
            payload: { subcategories: subcategoriesResult.subcategories }
        })
        const accountsResult = (await Api.getUserDocument(
            id,
            "accounts",
        )) as {
            accounts: UserAccountType[];
        };
        dispatch({
            type: 'setAccounts',
            payload: { accounts: accountsResult.accounts }
        })
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
            <>
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
            </>
        )
    }


}

export default App;
