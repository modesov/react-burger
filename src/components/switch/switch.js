import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import switchStyle from './switch.module.css';
import { tabPropTypes } from '../../utils/propTypeConst';

function Switch({tabs, current, setCurrent}) {    
    function onClickTab (value) {
        setCurrent(value)
        
        document.querySelector(`#${value}`).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    return (
        <nav className={switchStyle.switch}>
            {tabs.map(tab => <Tab key={tab.value} value={tab.value} active={current === tab.value} onClick={onClickTab}>{tab.text}</Tab>)}
        </nav>
    );
}

Switch.propTypes = {
    tabs: PropTypes.arrayOf(tabPropTypes).isRequired,
    current: PropTypes.string.isRequired,
    setCurrent: PropTypes.func.isRequired,
}

export default Switch;
