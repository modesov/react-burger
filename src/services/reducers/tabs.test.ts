import { setCurrentTab } from '../actions/tabs';
import tabs, { initialState } from './tabs';

describe('tabs reducer', () => {
  it('should return the initial state tabs', () => {
    expect(tabs(undefined, null))
      .toEqual(initialState)
  });

  it('should sets the current tab', () => {
    const action = setCurrentTab('main');

    expect(tabs(initialState, action))
      .toEqual(initialState.map((tab) => ({ ...tab, isActive: tab.value === action.value })))
  });
})