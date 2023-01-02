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
type Props = {
    showLoader: (value: boolean) => void
}

export const Header = ({ showLoader }: Props) => {
    const [dropdown, setDropdown] = useState(false)
    const [containerDropdown, setContainerDropdown] = useState(false)
    const { state, dispatch } = useContext(Context)
    const [containerCalendar, setContainerCalendar] = useState(false)
    const [dataCalendar, setDataCalendar] = useState({ left: 0, display: false })
    const [dateExtense, setDateExtense] = useState(`${DF.getDateExtense(new Date())} | ${DF.getHoursExtense(new Date())}`)

    useEffect(() => {
        handleDate()
    }, []);

    const handleDropdown = () => {
        setContainerDropdown(true)
        setTimeout(() => {
            setDropdown(true)
        }, 25)
    }

    const closeDropdown = (e: React.MouseEvent<HTMLElement>) => {
        const element = e.target as HTMLElement
        if (element.classList.contains('containerMenuDropDown')) {
            setDropdown(false)
            setTimeout(() => {
                setContainerDropdown(false)
            }, 100)
        }
    }

    const handleDate = () => {
        setInterval(() => {
            setDateExtense(`${DF.getDateExtense(new Date())} | ${DF.getHoursExtense(new Date())}`)
        }, 1000)
    }

    const closeContainerCalendar = (e: React.MouseEvent<HTMLElement>) => {
        const element = e.target as HTMLElement
        if (element.classList.contains('containerCalendar')) {
            setDataCalendar({ ...dataCalendar, display: false })
            setTimeout(() => {
                setContainerCalendar(false)
            }, 300)
        }
    }

    const closeCalendar = () => {
        setDataCalendar({ ...dataCalendar, display: false })
        setTimeout(() => {
            setContainerCalendar(false)
        }, 300)
    }

    const handleLogOut = () => {
        showLoader(true)
        Api.signOut()
        dispatch({
            type: 'setUser',
            payload: { user: null }
        })
    }

    const handleMonth = (e: React.MouseEvent<HTMLElement>) => {
        let element = e.currentTarget
        const data = element?.getBoundingClientRect() as DOMRect
        setContainerCalendar(true)
        setTimeout(() => {
            setDataCalendar({ display: true, left: data.left - 95 })
        }, 200)
    }

    const onClickCalendar = (date: Date) => {
        dispatch({
            type: 'setSelectedDate',
            payload: { selectedDate: date }
        })
        closeCalendar()
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
                {state.theme.status === 'Dark' &&
                    <img className='LogoClose' src={LogoDark2} alt="" />
                }
                {state.theme.status === 'Light' &&
                    <img className='LogoClose' src={LogoLight2} alt="" />
                }
            </div>
            <div className='infoUser'>
                <span className='infoNameUser'>Bem vindo, {state.user.data?.name.split(' ')[0]}</span>
                <span className='infoDate'>{dateExtense}</span>
            </div>
            <div className='boxSelectMonth'>
                {state.general.selectMonth &&
                    <div onClick={handleMonth} className='selectMonth'>
                        <span>{getMonthString()}</span>
                        <div className='icon'>
                            <KeyboardArrowDownIcon />
                        </div>
                    </div>
                }
            </div>
            <div className='boxToggleMenu'>
                <div onClick={handleDropdown} className='toggleMenu'>
                    <img src={state.user.data?.photo} alt="" />
                </div>
            </div>

            {containerDropdown &&
                <div onClick={closeDropdown} className='containerMenuDropDown'>
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
                </div>
            }
            {containerCalendar &&
                <div onClick={closeContainerCalendar} className='containerCalendar'>
                    {dataCalendar.display &&
                        <MonthCalendar Click={onClickCalendar} dateCurrent={state.user.selectedDate} dataCalendar={dataCalendar} closeModal={closeCalendar} />
                    }
                </div>
            }
        </C.Container>
    )
}