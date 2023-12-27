import { SettingsType } from '@/@types/settings.d';

const settings: SettingsType = {
  siteTitle: 'Admin',
  appId: 'FC1E5A4B-3027-43F2-BE61-8CB5FF60D2A7',

  siteRole: 'role',
  accessToken: 'access_token',
  ajaxHeadersTokenKey: 'x-token',
  ajaxResponseNoVerifyUrl: [
    '/user/login',
    '/user/info',
  ],

  headFixed: true,
  theme: 'light',
  leftSiderFixed: true,

  tabNavEnable: false,
  tabNavHomePath: '/home/workplace',
  navMode: 'inline',
};

export default settings;
