import * as C from './ModalExpenseCatItem.styled';
import { useContext } from 'react';

type Props = {
    colorTitle: string;
    colorPrimary: string;
    label: string;
}

export const ModalExpenseCatItem = ({ colorTitle, colorPrimary, label }: Props) => {
    return (
        <C.Container colorTitle={colorTitle} colorPrimary={colorPrimary}>
            <span className='text-nowrap'>{label}</span>
        </C.Container>
    )
}