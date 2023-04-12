import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import headerStyle from './app-header.module.css';
import ItemMenu from '../item-menu/item-menu';
import { selectorUser } from '../../services/selectors';
import { ItemsMenuType } from '../../utils/types';
import { useSelector } from '../../services/hooks';

const AppHeader: FC = () => {
  const user = useSelector(selectorUser);

  const itemsMainMenu: ItemsMenuType[] = [
    {
      href: '/',
      text: 'Конструктор',
      icon: <BurgerIcon type='secondary' />
    },
    {
      href: '/feed',
      text: 'Лента заказов',
      icon: <ListIcon type='secondary' />
    }
  ];

  const itemsAccountMenu: ItemsMenuType[] = user ? [
    {
      href: '/profile',
      text: 'Личный кабинет',
      icon: <ProfileIcon type='secondary' />
    }
  ]
    : [
      {
        href: '/login',
        text: 'Войти',
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
            <Link to="/"><Logo /></Link>
          </div>
          <nav>
            <ul className={headerStyle.menu}>
              {user?.name}
              {itemsAccountMenu.map((el, index) =>
                <li className={`mr-2 ${headerStyle.itemMenu}`} key={index}>
                  <ItemMenu href={el.href} text={el.text} icon={el.icon} />
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
