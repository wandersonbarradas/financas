import * as C from './ModalNewCategory.styled'
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/context';
import { CategoryType, SubCategories } from '../../types/UserType';

type Props = {
    type: "expense" | "income";
    typeContent: "category" | "subcategory";
    toEdit: boolean;
    selectCategory?: CategoryType | SubCategories | null
    submit: (name: string, color?: string) => void;
}

export const ModalNewCategory = ({ type, typeContent, toEdit, selectCategory, submit, }: Props) => {
    const { state, dispatch } = useContext(Context)
    const [name, setName] = useState('');
    const [color, setColor] = useState(state.theme.theme.colorPrimary)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        setName('')
        setColor(state.theme.theme.colorPrimary)
        if (selectCategory) {
            setName(selectCategory.name)
            setColor(selectCategory.color)
        }
    }, []);

    useEffect(() => {
        if (name.length < 2 || !color) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [name, color]);

    const handleSubmit = () => {
        setDisabled(true)
        submit(name, color)
    }
    return (
        <C.Container Theme={state.theme.theme} Type={type}>
            <div className='modalNewCategory'>
                <h4>Cadastrar nova {typeContent === 'category' ? "Categoria" : "Subcategoria"}</h4>
                <div className='form'>
                    <div className='inptu-item'>
                        <input
                            value={name}
                            autoFocus
                            placeholder='Nome'
                            type="text"
                            onChange={
                                (e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)
                            } />
                    </div>
                    {typeContent === 'category' &&
                        <div className='otherFields'>
                            <div className='field'>
                                <label htmlFor="">Cor da Categoria</label>
                                <input type="color"
                                    value={color}
                                    onChange={
                                        (e: React.ChangeEvent<HTMLInputElement>) => setColor(e.currentTarget.value)
                                    } />
                            </div>

                        </div>
                    }
                    <div className='footer'>
                        {!toEdit &&
                            <button disabled={disabled} onClick={handleSubmit}>Adicionar</button>
                        }{toEdit &&
                            <button disabled={disabled} onClick={handleSubmit}>Editar</button>
                        }
                    </div>
                </div>
            </div>
        </C.Container>
    )
}