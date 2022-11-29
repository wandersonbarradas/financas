import { useRoutes } from 'react-router-dom'
import { Categorias } from '../pages/categorias/Categorias'
import { Dashboard } from '../pages/dashbord/Dashboard'
import { PageLogin } from '../pages/login/Login'

type HandleModalType = {
    handleModal: (value?: boolean, type?: 'income' | 'expense' | 'transfer') => void
}

export const MainRouter = ({ handleModal }: HandleModalType) => {
    return useRoutes([
        { path: '/', element: <Dashboard handleModal={handleModal} /> },
        { path: '/dashboard', element: <Dashboard handleModal={handleModal} /> },
        { path: '/categorias', element: <Categorias /> },
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