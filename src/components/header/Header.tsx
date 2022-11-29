import * as C from './Header.styled'
import { useContext, useEffect, useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
type Props = {
    showLoader: (value: boolean) => void
}

export const Header = ({ showLoader }: Props) => {
    const [dropdown, setDropdown] = useState(false)
    const [containerDropdown, setContainerDropdown] = useState(false)
    const { state, dispatch } = useContext(Context)
    const [containerCalendar, setContainerCalendar] = useState(false)
    const [dataCalendar, setDataCalendar] = useState({ left: 0, display: false })
    const [dateRef, setDateRef] = useState(new Date())

    const handleDropdown = () => {
        setContainerDropdown(true)
        setTimeout(() => {
            setDropdown(true)
        }, 100)
    }

    const closeDropdown = (e: React.MouseEvent<HTMLElement>) => {
        const element = e.target as HTMLElement
        if (element.classList.contains('containerMenuDropDown')) {
            setDropdown(false)
            setTimeout(() => {
                setContainerDropdown(false)
            }, 300)
        }
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
            setDataCalendar({ display: true, left: data.left - 67 })
        }, 200)
    }

    const onClickCalendar = (date: Date) => {
        setDateRef(date)
        closeCalendar()
    }

    const getMonthString = () => {
        if (dayjs(dateRef).year() === dayjs().year()) {
            return DF.getMonthString(dayjs(dateRef).month())
        } else {
            return `${DF.getMonthString(dayjs(dateRef).month())} ${dayjs(dateRef).year()}`
        }
    }

    return (
        <C.Container dropdown={dropdown} Theme={state.theme.theme}>
            {state.general.selectMonth &&
                <div className='leftSide'>
                    <div onClick={handleMonth} className='selectMonth'>
                        <span>{getMonthString()}</span>
                        <div className='icon'>
                            <KeyboardArrowDownIcon />
                        </div>
                    </div>
                </div>
            }
            <div className='rightSide'>
                <div onClick={handleDropdown} className='perfilCard'>
                    <div className='perfilPhoto'>
                        <img src={state.user?.photo} alt="" />
                    </div>
                    <span className='perfilName'>{state.user?.name}</span>
                    <div className='perfilIcon'>
                        <ArrowDropDownIcon />
                    </div>
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
                        <MonthCalendar Click={onClickCalendar} dateCurrent={dateRef} dataCalendar={dataCalendar} closeModal={closeCalendar} />
                    }
                </div>
            }
        </C.Container>
    )
}