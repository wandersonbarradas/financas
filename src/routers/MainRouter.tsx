import { useRoutes } from 'react-router-dom'
import { Categories } from '../pages/categories/Categories'
import { Dashboard } from '../pages/dashbord/Dashboard'
import { PageLogin } from '../pages/login/Login'
import { Account } from '../pages/accounts/Accounts'

type HandleModalType = {
    handleModal: (value?: boolean, type?: 'income' | 'expense' | 'transfer') => void
}

export const MainRouter = ({ handleModal }: HandleModalType) => {
    return useRoutes([
        { path: '/', element: <Dashboard handleModal={handleModal} /> },
        { path: '/dashboard', element: <Dashboard handleModal={handleModal} /> },
        { path: '/contas', element: <Account /> },
        { path: '/categorias', element: <Categories /> },
        { path: '*', element: <Dashboard handleModal={handleModal} /> },
    ])
}

export const LoginRouter = () => {
    return useRoutes([
        {
            path: '*', element: <PageLogin />
        },
    ])
}