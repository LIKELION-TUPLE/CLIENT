import { atom } from 'recoil';

export const selectedDate = atom<string>({
  key: 'selectedDate',
  default: '',
});
