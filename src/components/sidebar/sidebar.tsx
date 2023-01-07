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
import { useEffect, useState } from 'react';
import { Context } from '../../context/context';
import { useContext } from 'react'
import Api from '../../Api';
import { Dark, Light } from '../../reducers/ThemeReducer'
import Cookies from 'js-cookie'
import AddIcon from '@mui/icons-material/Add';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import TransformOutlinedIcon from '@mui/icons-material/TransformOutlined';
import { Modal } from '../modais/Modais'
import { ModalTransaction } from '../modalTransaction/ModalTransaction'


type Props = {
    showLoader: (value: boolean) => void;
}

export const SideBar = ({ showLoader }: Props) => {
    const [openMenu, setOpenMenu] = useState(true)
    const [modalMore, setModalMore] = useState(false)
    const [cordenadas, setCordenadas] = useState({ top: 0, left: 0 })
    const [modalAdd, setModalAdd] = useState(false)
    const [modalTransaction, setModalTransaction] = useState(false)
    const [typeTransaction, setTypeTransaction] = useState<'expense' | 'income' | 'transfer'>('expense')
    const { state, dispatch } = useContext(Context)
    const [addTransactionMobile, setAddTransactionMobile] = useState(false)
    useEffect(() => {
        setOpenMenu(state.general.sideBar)
    }, [state.general.sideBar]);

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
        setModalMore(true)
    }

    const handleClickModalMore = (e: React.MouseEvent<HTMLElement>) => {
        const element = e.target as HTMLElement
        if (element.classList.contains('containerModalMore')) {
            setModalMore(false)
        }
    }

    const handleSideBar = () => {
        setOpenMenu(openMenu ? false : true)
        dispatch({
            type: 'setSideBar',
            payload: { sideBar: openMenu ? false : true }
        })
        Cookies.set("sidebar", openMenu ? '0' : '1', { expires: 999 });
    }

    const handleNewTransition = (type: 'expense' | 'income' | 'transfer') => {
        setModalAdd(false)
        setAddTransactionMobile(false)
        setTypeTransaction(type)
        setModalTransaction(true)
    }

    return (
        <C.Container modalMore={{ top: cordenadas.top, left: cordenadas.left }} Theme={state.theme.theme} menu={openMenu}>
            <div className='sidebar scroll'>
                <div className='box-logo' onClick={handleSideBar}>
                    {state.theme.status === 'Dark' &&
                        <img className={openMenu ? '' : 'LogoClose'} src={openMenu ? LogoDark : LogoDark2} alt="" />
                    }
                    {state.theme.status === 'Light' &&
                        <img className={openMenu ? '' : 'LogoClose'} src={openMenu ? LogoLight : LogoLight2} alt="" />
                    }
                </div>
                <div className='boxBtnAdd'>
                    <button onClick={() => setModalAdd(true)} className='cssbuttons-io-button'>
                        <AddIcon />
                        {openMenu && <span>Add</span>}
                    </button>
                </div>
                <nav className='navigation'>
                    <ul className='list-navigation'>
                        <ListItemSideBar Class='dashboad' menuOpen={openMenu} Icon={DashboardIcon} label='Dashboard' url="/dashboard" />
                        <ListItemSideBar Class='invoice' menuOpen={openMenu} Icon={ArticleIcon} label='Fatura' url="/fatura" />
                        <ListItemSideBar Class='account' menuOpen={openMenu} Icon={AccountBalanceIcon} label='Contas' url="/contas" />
                        <div className='boxBtnAdd mobile'>
                            <button onClick={() => setAddTransactionMobile(true)} className='cssbuttons-io-button'>
                                <AddIcon />
                                {openMenu && <span>Add</span>}
                            </button>
                        </div>
                        <ListItemSideBar Class='report' menuOpen={openMenu} Icon={SignalCellularAltIcon} label='Relatórios' url="relatorios" />
                        <ListItemSideBar Class='transactions' menuOpen={openMenu} Icon={ListIcon} label='Transações' url="transacoes" />
                        <ListItemSideBar Class='moreOptions' menuOpen={openMenu} click={handelModalMore} Icon={MoreHorizIcon} label='Mais' />
                    </ul>
                    <ul className='list-options'>
                        <ListItemSideBar Class='settings' menuOpen={openMenu} Icon={SettingsIcon} label='Configurações' />
                        <ListItemSideBar Class='help' logout={handleTheme} menuOpen={openMenu} Icon={HelpIcon} label='Ajuda' url=' ' />
                        <ListItemSideBar Class='LogOut' menuOpen={openMenu} Icon={ArrowBackIcon} logout={handleLogOut} label='Log Out' url='/login' />
                    </ul>
                </nav>
                <Modal clickAway={true} open={modalMore} setOpen={setModalMore} modalOpacity={0}>
                    <div onClick={handleClickModalMore} className='containerModalMore'>
                        <div className='modalMore'>
                            <ul>
                                <li>
                                    <Link onClick={() => setModalMore(false)} to='/categorias'>
                                        <div className='icon'><TurnedInNotIcon /></div>
                                        Categorias
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={() => setModalMore(false)} to='tags'>
                                        <div className='icon'><TagIcon /></div>
                                        Tags
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Modal>
                <Modal clickAway={true} open={modalAdd} setOpen={setModalAdd} modalOpacity={0}>
                    <ul className='menuAdd'>
                        <li onClick={() => handleNewTransition('expense')} className='listItem'> <div className='icon des'><TrendingDownOutlinedIcon /></div> <span>Despesa</span></li>
                        <li onClick={() => handleNewTransition('income')} className='listItem'> <div className='icon res'><TrendingUpOutlinedIcon /></div> <span>Receita</span></li>
                        <li onClick={() => handleNewTransition('transfer')} className='listItem'> <div className='icon tras'><TransformOutlinedIcon /></div> <span>Transferência</span></li>
                    </ul>
                </Modal>
            </div>
            <Modal clickAway={false} modalOpacity={0.5} setOpen={setModalTransaction} open={modalTransaction}>
                <div className='boxModalTransaction'>
                    <div className='headerBox'>
                        <div onClick={() => setModalTransaction(false)} className='icon'><ArrowBackIcon fontSize='large' /></div>
                        <h3 className='titleTransaction'>{typeTransaction === 'expense' ? 'Nova despesa' : typeTransaction === 'income' ? 'Nova receita' : 'Nova transferência'}</h3>
                    </div>
                    <ModalTransaction setClose={setModalTransaction} type={typeTransaction} />
                </div>
            </Modal>
            <Modal modalOpacity={0.5} open={addTransactionMobile} setOpen={setAddTransactionMobile} clickAway={true}>
                <div className='containerModalAdd'>
                    <div className='row'>
                        <button className='itemAdd' onClick={() => handleNewTransition('expense')}>
                            <div className='icon des'><TrendingDownOutlinedIcon /></div>
                            Despesa
                        </button>
                    </div>
                    <div className='row'>
                        <button className='itemAdd' onClick={() => handleNewTransition('income')}>
                            <div className='icon res'><TrendingUpOutlinedIcon /></div>
                            Receita
                        </button>
                        <button className='itemAdd' onClick={() => handleNewTransition('transfer')}>
                            <div className='icon tras'><TransformOutlinedIcon /></div>
                            Transferência
                        </button>
                    </div>
                </div>
            </Modal>
        </C.Container>
    )
}