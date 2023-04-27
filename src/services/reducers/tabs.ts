import { TabType } from '../../utils/types';
import { TTabsActions } from '../actions/tabs';
import {
  SET_CURRENT_TAB
} from '../constants';


export const initialState: TabType[] = [
  {
    value: 'bun',
    text: 'Булки',
    isActive: true,
  },
  {
    value: 'sauce',
    text: 'Соусы',
    isActive: false,
  },
  {
    value: 'main',
    text: 'Начинки',
    isActive: false,
  },
];

const tabs = (state = initialState, action: TTabsActions | null): TabType[] => {
  switch (action?.type) {
    case SET_CURRENT_TAB: {
      return state.map((tab) => ({ ...tab, isActive: tab.value === action.value }));
    }
    default: {
      return state;
    }
  }
}

export default tabs;
