import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import switchStyle from './switch.module.css';
import { tabPropTypes } from '../../utils/propTypeConst';

function Switch({ tabs, onClick }) {
  const onClickTab = useCallback((value) => {
    onClick(value);    
  }, [onClick]);

  return (
    <nav className={switchStyle.switch}>
      {tabs.map(tab => <Tab key={tab.value} value={tab.value} active={tab.isActive} onClick={onClickTab}>{tab.text}</Tab>)}
    </nav>
  );
}

Switch.propTypes = {
  tabs: PropTypes.arrayOf(tabPropTypes).isRequired,
  onClick: PropTypes.func.isRequired
}

export default memo(Switch);
