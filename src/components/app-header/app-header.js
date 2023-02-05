import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ItemMenu from '../item-menu/item-menu';
import headerStyle from './app-header.module.css';

function AppHeader() {
    const itemsMainMenu = [
        {
            href: '/constructor',
            text: 'Конструктор',
            icon: <BurgerIcon type='secondary' />
        },
        {
            href: '/orders',
            text: 'Лента заказов',
            icon: <ListIcon type='secondary' />
        }
    ];

    const itemsAccountMenu = [
        {
            href: '/personal-account',
            text: 'Личный кабинет',
            icon: <ProfileIcon type='secondary' />
        }
    ];

    return (
        <header className={`${headerStyle.header} pr-5 pl-5`}>
            <div className='container'>
                <div className={`${headerStyle.headerContent} pt-4 pb-4`}>
                    <nav>
                        <ul className={headerStyle.menu}>
                            {itemsMainMenu.map((el, index) =>
                                <li className={`mr-2 ${headerStyle.itemMenu}`} key={index}>
                                    <ItemMenu href={el.href} text={el.text} icon={el.icon} />
                                </li>
                            )}
                        </ul>
                    </nav>
                    <div className={headerStyle.logo}>
                        <a href="/"><Logo /></a>
                    </div>
                    <nav>
                        <ul className={headerStyle.menu}>
                            {itemsAccountMenu.map((el, index) =>
                                <li className={`mr-2 ${headerStyle.itemMenu}`} key={index}>
                                    <ItemMenu href={el.href} text={el.text} icon={el.icon} />
                                </li>)}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
