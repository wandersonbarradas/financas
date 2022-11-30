import * as C from './Login.styled'
import { Context } from '../../context/context'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../../Api'
import Logo from '../../assets/LogoLight.svg'
import VectorIlustration from '../../assets/Manage money-pana.svg'
import IconGoogle from '../../assets/search.png'
export const PageLogin = () => {
    const [persistent, setPersistent] = useState(false)
    const { state, dispatch } = useContext(Context)
    const [margin, setMargin] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/login')
    }, [navigate])

    const handleLogin = async () => {

        const resultUser = await Api.getLogin(persistent)
        dispatch({
            type: 'setUser',
            payload: { user: resultUser }
        })
    }

    const handleCardLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        const element = e.currentTarget;
        document.querySelector('.headerLogin .active')?.classList.remove('active')
        element.classList.add('active')
        if (element.id === 'entrar') {
            setMargin(0)
        } else {
            setMargin(-470)
        }
    }

    const handlePersistent = (e: React.MouseEvent<HTMLInputElement>) => {
        const check = e.currentTarget.checked;
        setPersistent(check)
    }

    return (
        <C.Container margin={margin} Theme={state.theme.theme}>
            <header>
                <div className='logo'>
                    <img src={Logo} alt="" />
                </div>
            </header>
            <main>
                <div className='rightSide'>
                    <h1>Dê o primeiro passo rumo a sua liberdade econômica.</h1>
                    <img src={VectorIlustration} alt="" />
                    <p>“Uma jornada de mil quilômetros precisa começar com um simples passo.” – Lao Tzu</p>
                </div>
                <div className='leftSide'>
                    <div className='contentLogin'>
                        <div className='headerLogin'>
                            <button onClick={handleCardLogin} id='entrar' className='active'>Entrar</button>
                            <button onClick={handleCardLogin} id='cadastrar'>Cadastrar</button>
                        </div>
                        <div className='content'>
                            <div className='bodyLogin loginArea'>
                                <button className='loginGoogle' onClick={handleLogin} >
                                    <div className='icon'>
                                        <img src={IconGoogle} alt="" />
                                    </div>
                                    Entrar com o Google
                                </button>

                                <label className="cont">
                                    Continuar conectado.
                                    <input onClick={handlePersistent} type="checkbox" />
                                    <span></span>
                                </label>
                            </div>
                            <div className='bodyLogin cadastroArea'>
                                <button className='loginGoogle' onClick={handleLogin} >
                                    <div className='icon'>
                                        <img src={IconGoogle} alt="" />
                                    </div>
                                    Cadastre-se com o Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </C.Container>
    )
}