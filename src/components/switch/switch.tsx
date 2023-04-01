import { FC, memo, useCallback } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import switchStyle from './switch.module.css';
import { TabType } from '../../utils/types';
import { OnClickTabCallback } from '../burger-ingredients/burger-ingredients';

interface SwitchProps {
  tabs: TabType[];
  onClick: OnClickTabCallback;
}

const Switch: FC<SwitchProps> = ({ tabs, onClick }) => {
  const onClickTab = useCallback<OnClickTabCallback>((value) => {
    onClick(value);    
  }, [onClick]);

  return (
    <nav className={switchStyle.switch}>
      {tabs.map(tab => <Tab key={tab.value} value={tab.value} active={tab.isActive} onClick={onClickTab}>{tab.text}</Tab>)}
    </nav>
  );
}

export default memo(Switch);
