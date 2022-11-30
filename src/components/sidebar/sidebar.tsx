import * as C from './sidebar.styled'
import LogoLight from '../../assets/LogoLight.svg'
import LogoLight2 from '../../assets/Logo2Light.svg'
import LogoDark from '../../assets/LogoDark.svg'
import LogoDark2 from '../../assets/Logo2Dark.svg'
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
import { Dark, Light } from '../../reducers/ThemeReducer'
import Cookies from 'js-cookie'


type Props = {
    showLoader: (value: boolean) => void;
}

export const SideBar = ({ showLoader }: Props) => {
    const [openMenu, setOpenMenu] = useState(true)
    const [modalMore, setModalMore] = useState(false)
    const [opacityModalMore, setOpacityModalMore] = useState(0)
    const [cordenadas, setCordenadas] = useState({ top: 0, left: 0 })
    const { state, dispatch } = useContext(Context)

    const handleLogOut = () => {
        showLoader(true)
        Api.signOut()
        dispatch({
            type: 'setUser',
            payload: { user: null }
        })
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

    const handelModalMore = (top: number, left: number) => {
        setCordenadas({ top, left })
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
        <C.Container modalMore={{ opacity: opacityModalMore, top: cordenadas.top, left: cordenadas.left }} Theme={state.theme.theme} menu={openMenu}>
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
                {state.theme.status === 'Dark' &&
                    <img className={openMenu ? '' : 'LogoClose'} src={openMenu ? LogoDark : LogoDark2} alt="" />
                }
                {state.theme.status === 'Light' &&
                    <img className={openMenu ? '' : 'LogoClose'} src={openMenu ? LogoLight : LogoLight2} alt="" />
                }
            </div>
            <nav className='navigation'>
                <ul className='list-navigation'>
                    <ListItemSideBar menuOpen={openMenu} Icon={DashboardIcon} label='Dashboard' url="/dashboard" />
                    <ListItemSideBar menuOpen={openMenu} Icon={ArticleIcon} label='Fatura' url="/fatura" />
                    <ListItemSideBar menuOpen={openMenu} Icon={AccountBalanceIcon} label='Bancos' url="/bancos" />
                    <ListItemSideBar menuOpen={openMenu} Icon={SignalCellularAltIcon} label='Relatórios' url="relatorios" />
                    <ListItemSideBar menuOpen={openMenu} Icon={ListIcon} label='Transações' url="transacoes" />
                    <ListItemSideBar menuOpen={openMenu} click={handelModalMore} Icon={MoreHorizIcon} label='Mais opções' />
                </ul>
                <ul className='list-options'>
                    <ListItemSideBar menuOpen={openMenu} Icon={SettingsIcon} label='Configurações' />
                    <ListItemSideBar logout={handleTheme} menuOpen={openMenu} Icon={HelpIcon} label='Ajuda' url=' ' />
                    <ListItemSideBar menuOpen={openMenu} Icon={ArrowBackIcon} logout={handleLogOut} label='Log Out' url='/login' />
                </ul>
            </nav>
        </C.Container>
    )
}