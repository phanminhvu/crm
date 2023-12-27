import { atom, selector } from 'recoil';

export interface CurrentUser {
  id: number;
  name: string;
  avatar: string;
  roles: string[];
}

export const initialState: CurrentUser = {
  id: 0,
  name: '',
  avatar: '',
  roles: [],
};

export const userState = atom({
  key: 'userState',
  default: initialState,
});

export const userMessageState = selector({
  key: 'userMessageState',
  get: async () => {
    return 10;
  },
});
