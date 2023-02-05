import PropTypes from 'prop-types';

import itemMenuStyle from './item-menu.module.css';

function ItemMenu({href, isActive, text, icon}) {
    return (
        <a className={`${itemMenuStyle.menuItem} ${isActive ? itemMenuStyle.menuItemActive : ''} p-5`} href={href}>
            {icon({type: isActive ? 'primary' : 'secondary'})}
            <span type="primary" className='ml-2 text text_type_main-default'>{text}</span>
        </a>
    ) 
}

ItemMenu.propTypes = {
    href: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired
}

export default ItemMenu;