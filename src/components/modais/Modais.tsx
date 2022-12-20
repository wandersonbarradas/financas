import { ReactNode, useEffect, useState } from 'react';
import * as C from './Modais.styled'

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;
    modalOpacity: number;
}

export const Modal = ({ open, setOpen, children, modalOpacity }: Props) => {
    const [modal, setModal] = useState(false)
    const [opacity, setOpacity] = useState(0)

    useEffect(() => {
        handleModal()
    }, [open]);

    const handleModal = () => {
        if (open) {
            setModal(true)
            setTimeout(() => {
                setOpacity(1)
            }, 225)
        } else {
            setOpacity(0)
            setTimeout(() => {
                setModal(false)
            }, 225)
        }
    }

    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        const element = e.target as HTMLDivElement;
        if (element.id === 'modal') {
            setOpacity(0)
            setTimeout(() => {
                setModal(false)
            }, 225)
            setOpen(false)
        }
    }

    return (
        <>
            {modal &&
                <C.Container modalOpacity={modalOpacity} onClick={closeModal} id='modal' opacity={opacity}>
                    {children}
                </C.Container>
            }
        </>
    )
}