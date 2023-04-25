import { SET_CURRENT_TAB } from '../constants';

export interface ISetCurrentTabAction {
  readonly type: typeof SET_CURRENT_TAB;
  readonly value: string;
}

export type TTabsActions = ISetCurrentTabAction;

export const setCurrentTab = (value: string): ISetCurrentTabAction => ({
  type: SET_CURRENT_TAB,
  value
});
