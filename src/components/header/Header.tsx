import * as C from './Header.styled'
import { useContext, useEffect, useState } from 'react'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Context } from '../../context/context'
import { Link } from 'react-router-dom';
import Api from '../../Api';
import { MonthCalendar } from '../monthCalendar/MonthCalendar';
import dayjs from 'dayjs';
import DF from "../../helpers/DateFunctions";
import LogoLight2 from '../../assets/Logo2Light.svg'
import LogoDark2 from '../../assets/Logo2Dark.svg'
import { Modal } from '../modais/Modais';
type Props = {
    showLoader: (value: boolean) => void
}

export const Header = ({ showLoader }: Props) => {
    const [dropdown, setDropdown] = useState(false)
    const { state, dispatch } = useContext(Context)
    const [calendar, setCalendar] = useState(false)
    const [dateExtense, setDateExtense] = useState(`${DF.getDateExtense(new Date())} | ${DF.getHoursExtense(new Date())}`)

    useEffect(() => {
        handleDate()
    }, []);

    const handleDate = () => {
        setInterval(() => {
            setDateExtense(`${DF.getDateExtense(new Date())} | ${DF.getHoursExtense(new Date())}`)
        }, 1000)
    }

    const handleLogOut = () => {
        showLoader(true)
        Api.signOut()
        dispatch({
            type: 'setUser',
            payload: { user: null }
        })
    }

    const onClickCalendar = (date: Date) => {
        dispatch({
            type: 'setSelectedDate',
            payload: { selectedDate: date }
        })
        setCalendar(false)
    }

    const getMonthString = () => {
        if (dayjs(state.user.selectedDate).year() === dayjs().year()) {
            return DF.getMonthString(dayjs(state.user.selectedDate).month())
        } else {
            return `${DF.getMonthString(dayjs(state.user.selectedDate).month())} ${dayjs(state.user.selectedDate).year()}`
        }
    }
    return (
        <C.Container selectMonth={state.general.selectMonth} dropdown={dropdown} Theme={state.theme.theme}>
            <div className='box-logo'>
                <Link to={'/'}>
                    {state.theme.status === 'Dark' &&
                        <img className='LogoClose' src={LogoDark2} alt="" />
                    }
                    {state.theme.status === 'Light' &&
                        <img className='LogoClose' src={LogoLight2} alt="" />
                    }
                </Link>
            </div>
            <div className='infoUser'>
                <span className='infoNameUser'>Bem vindo, {state.user.data?.name.split(' ')[0]}</span>
                <span className='infoDate'>{dateExtense}</span>
            </div>
            <div className='boxSelectMonth'>
                {state.general.selectMonth &&
                    <div onClick={() => setCalendar(true)} className='selectMonth'>
                        <span>{getMonthString()}</span>
                        <div className='icon'>
                            <KeyboardArrowDownIcon />
                        </div>
                    </div>
                }
            </div>
            <div className='boxToggleMenu'>
                <div onClick={() => setDropdown(true)} className='toggleMenu'>
                    <img src={state.user.data?.photo} alt="" />
                </div>
            </div>
            <Modal open={dropdown} setOpen={setDropdown} clickAway={true} modalOpacity={0}>
                <div className='dropdown'>
                    <ul>
                        <li>
                            <Link to='/perfil'>
                                <div className='icon'><PermIdentityIcon /></div>
                                Meu perfil
                            </Link>
                        </li>
                        <li>
                            <Link to='/configuracoes'>
                                <div className='icon'><SettingsIcon /></div>
                                Configurações
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleLogOut} to='/login'>
                                <div className='icon'><LogoutIcon /></div>
                                Sair
                            </Link>
                        </li>
                    </ul>
                </div>
            </Modal>
            <Modal open={calendar} setOpen={setCalendar} clickAway={true} modalOpacity={0.5}>
                <MonthCalendar Click={onClickCalendar} dateCurrent={state.user.selectedDate} closeModal={setCalendar} />
            </Modal>
        </C.Container>
    )
}