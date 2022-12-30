import { useRoutes } from 'react-router-dom'
import { Categories } from '../pages/categories/Categories'
import { Dashboard } from '../pages/dashbord/Dashboard'
import { Transactions } from '../pages/transactions/transactions'
import { PageLogin } from '../pages/login/Login'
import { Account } from '../pages/accounts/Accounts'

export const MainRouter = () => {
    return useRoutes([
        { path: '/', element: <Dashboard /> },
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/contas', element: <Account /> },
        { path: '/categorias', element: <Categories /> },
        { path: '/transacoes', element: <Transactions /> },
        { path: '*', element: <Dashboard /> },
    ])
}

export const LoginRouter = () => {
    return useRoutes([
        {
            path: '*', element: <PageLogin />
        },
    ])
}