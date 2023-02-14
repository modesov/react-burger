import PropTypes from 'prop-types';

import itemMenuStyle from './item-menu.module.css';

function ItemMenu({ href, text, icon }) {
  return (
    <a className={`${itemMenuStyle.menuItem} p-5`} href={href}>
      {icon}
      <span type="primary" className='ml-2 text text_type_main-default'>{text}</span>
    </a>
  );
}

ItemMenu.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired
}

export default ItemMenu;
