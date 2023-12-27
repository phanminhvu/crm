export type Theme = 'dark' | 'light';

export type NavMode = 'inline' | 'horizontal';

export interface SettingsType {
 
  siteTitle: string;

  appId: string;

  siteRole: string;

  accessToken: string;

  ajaxHeadersTokenKey: string;

  ajaxResponseNoVerifyUrl: string[];

  headFixed: boolean;

  theme: Theme;

  leftSiderFixed: boolean;

  tabNavEnable: boolean;

  tabNavHomePath: string;

  navMode: NavMode;
}
