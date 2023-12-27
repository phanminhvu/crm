import settings from '@/config/settings';

export const getToken = () => localStorage.getItem(settings.accessToken);
export const getRole = () => localStorage.getItem(settings.siteRole);

export const setToken = (token: string) => {
  localStorage.setItem(settings.accessToken, token);
};

export const setRole = (token: string) => {
  localStorage.setItem(settings.siteRole, token);
};

export const removeToken = () => {
  localStorage.clear();
};
