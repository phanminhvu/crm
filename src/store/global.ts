import { atom } from 'recoil';

import settings from '@/config/settings';

import { Theme, NavMode } from '@/@types/settings.d';
import { TabNavItem } from '@/@types/router.d';

export interface StateType {
  collapsed: boolean;
  headFixed: boolean;
  theme: Theme;
  leftSiderFixed: boolean;
  tabNavEnable: boolean;
  headTabNavList: TabNavItem[];
  navMode: NavMode;
}

const initialState: StateType = {
  collapsed: false,
  headFixed: settings.headFixed,
  theme: settings.theme,
  leftSiderFixed: settings.leftSiderFixed,
  tabNavEnable: settings.tabNavEnable,
  headTabNavList: [],
  navMode: settings.navMode,
};

export const globalState = atom({
  key: 'globalState',
  default: initialState,
});
