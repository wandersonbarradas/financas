import * as C from './listItemSideBar.styled'
import { Link } from 'react-router-dom'
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

type Props = {
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string },
    label: string,
    url?: string,
    click?: (top: number) => void;
}

export const ListItemSideBar = ({ Icon, label, click, url }: Props) => {

    const handleBtn = (e: React.MouseEvent<HTMLElement>) => {
        let linkItem = e.currentTarget.querySelector('.link-item')
        let items: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.activeLinkNavBar')
        items.forEach((item) => {
            item.classList.remove('activeLinkNavBar')
        })
        linkItem?.classList.add('activeLinkNavBar')

    }

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        let linkItem = e.currentTarget.querySelector('.link-item')
        const data = linkItem?.getBoundingClientRect() as DOMRect
        if (click) {
            click(data.top - (data.height * 2))
        }
    }

    if (url) {
        return (
            <C.Container className='list-item-sideBar' onClick={handleBtn}>
                <Link className='link-item' to={label.toLowerCase()}>
                    <div className='box-icon'>
                        <Icon />
                    </div>
                    {label}
                </Link>
            </C.Container>
        )
    } else {
        return (
            <C.Container className='list-item-sideBar' onClick={handleClick}>
                <div className='link-item'>
                    <div className='box-icon'>
                        <Icon />
                    </div>
                    {label}
                </div>
            </C.Container>
        )
    }
}