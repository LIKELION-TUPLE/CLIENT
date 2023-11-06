import { atom } from 'recoil';

export const selectedDate = atom<string>({
  key: 'selectedDate',
  default: '',
});

export const userName = atom<string>({
  key: 'userName',
  default: '',
});

export const userType = atom<string>({
  key: 'userType',
  default: '',
});
