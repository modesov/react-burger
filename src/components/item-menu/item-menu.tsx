import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import itemMenuStyle from './item-menu.module.css';
import { ItemsMenuType } from '../../utils/types';

const ItemMenu: FC<ItemsMenuType> = ({ href, text, icon }) => {
  return (
    <NavLink
      className={({isActive }) => `${itemMenuStyle.menuItem} p-5 ${isActive ? itemMenuStyle.active : ''}` }
      to={href}
    >
      {icon}
      <span className='ml-2 text text_type_main-default'>{text}</span>
    </NavLink>
  );
}

export default ItemMenu;
