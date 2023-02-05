import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ItemMenu from '../item-menu/item-menu';
import headerStyle from './app-header.module.css';

function AppHeader() {
    const itemsMainMenu = [
        {
            href: '/constructor',
            isActive: true,
            text: 'Конструктор',
            icon: BurgerIcon
        },
        {
            href: '/orders',
            isActive: false,
            text: 'Лента заказов',
            icon: ListIcon
        }
    ];

    const itemsAccountMenu = [
        {
            href: '/personal-account',
            isActive: false,
            text: 'Личный кабинет',
            icon: ProfileIcon
        }
    ];

    return (
        <header className={`${headerStyle.header} pr-5 pl-5`}>
            <div className='container'>
                <div className={`${headerStyle.headerContent} pt-4 pb-4`}>
                    <nav>
                        <ul className={headerStyle.menu}>
                            {itemsMainMenu.map((el, index) => <li className={`mr-2 ${headerStyle.itemMenu}`} key={index}><ItemMenu href={el.href} isActive={el.isActive} text={el.text} icon={el.icon} /></li>)}
                        </ul>
                    </nav>
                    <div className={headerStyle.logo}>
                        <a href="/"><Logo /></a>
                    </div>
                    <nav>
                        <ul className={headerStyle.menu}>
                            {itemsAccountMenu.map((el, index) => <li key={index}><ItemMenu href={el.href} isActive={el.isActive} text={el.text} icon={el.icon} /></li>)}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
