import * as C from './sidebar.styled'
import Logo from '../../assets/Logo.svg'
import { ListItemSideBar } from '../listItemSideBar/listItemSideBar'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import ListIcon from '@mui/icons-material/List';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TagIcon from '@mui/icons-material/Tag';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Context } from '../../context/context';
import { useContext } from 'react'
import Api from '../../Api';
import Logo2 from '../../assets/so-wallet-coin.svg'

type Props = {
    showLoader: (value: boolean) => void
}

export const SideBar = ({ showLoader }: Props) => {
    const [openMenu, setOpenMenu] = useState(true)
    const [modalMore, setModalMore] = useState(false)
    const [opacityModalMore, setOpacityModalMore] = useState(0)
    const [top, setTop] = useState(0)
    const { state, dispatch } = useContext(Context)

    const handleLogOut = () => {
        showLoader(true)
        Api.signOut()
        dispatch({
            type: 'setUser',
            payload: { user: null }
        })
    }

    const handelModalMore = (top: number) => {
        setTop(top)
        setOpacityModalMore(0)
        setModalMore(true)
        setTimeout(() => {
            setOpacityModalMore(1)
        }, 100)
    }

    const handleCloseModalMore = () => {
        setOpacityModalMore(0)
        setTimeout(() => {
            setModalMore(false)
        }, 200)
    }

    const handleClickModalMore = (e: React.MouseEvent<HTMLElement>) => {
        const element = e.target as HTMLElement
        if (element.classList.contains('containerModalMore')) {
            handleCloseModalMore()
        }
    }

    return (
        <C.Container modalMore={{ opacity: opacityModalMore, top }} Theme={state.theme.theme} menu={openMenu}>
            {modalMore &&
                <div onClick={handleClickModalMore} className='containerModalMore'>
                    <div className='modalMore'>
                        <ul>
                            <li>
                                <Link onClick={handleCloseModalMore} to='/categorias'>
                                    <div className='icon'><TurnedInNotIcon /></div>
                                    Categorias
                                </Link>
                            </li>
                            <li>
                                <Link onClick={handleCloseModalMore} to='tags'>
                                    <div className='icon'><TagIcon /></div>
                                    Tags
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            }
            <div className='box-logo' onClick={() => setOpenMenu(openMenu ? false : true)}>
                <img className={openMenu ? '' : 'LogoClose'} src={openMenu ? Logo : Logo2} alt="" />
            </div>
            <nav className='navigation'>
                <ul className='list-navigation'>
                    <ListItemSideBar Icon={DashboardIcon} label='Dashboard' url="/dashboard" />
                    <ListItemSideBar Icon={ArticleIcon} label='Fatura' url="/fatura" />
                    <ListItemSideBar Icon={AccountBalanceIcon} label='Bancos' url="/bancos" />
                    <ListItemSideBar Icon={SignalCellularAltIcon} label='Relatórios' url="relatorios" />
                    <ListItemSideBar Icon={ListIcon} label='Transações' url="transacoes" />
                    <ListItemSideBar click={handelModalMore} Icon={MoreHorizIcon} label='Mais opções' />
                </ul>
                <ul className='list-options'>
                    <ListItemSideBar Icon={SettingsIcon} label='Configurações' />
                    <ListItemSideBar Icon={HelpIcon} label='Ajuda' />
                </ul>
            </nav>
            <Link className='logout' onClick={handleLogOut} to=''>
                <div className='box-icon'>
                    <ArrowBackIcon />
                </div>
                Log Out
            </Link>
        </C.Container>
    )
}