import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import itemMenuStyle from './item-menu.module.css';

function ItemMenu({ href, text, icon }) {
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

ItemMenu.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired
}

export default ItemMenu;
