import { selector } from 'recoil';
import { selectedDate, userInfo, tutoringInfo } from './atom';

export const dateSelect = selector({
  key: 'dateSelect',
  get: ({ get }) => get(selectedDate),
  set: ({ set }, newDate) => {
    set(selectedDate, newDate);
  },
});

export const userInfoSave = selector({
  key: 'userTypeSave',
  get: ({ get }) => get(userInfo),
  set: ({ set }, newUserInfo) => {
    set(userInfo, newUserInfo);
  },
});

export const tutoringInfoSave = selector({
  key: 'tutoringInfoSave',
  get: ({ get }) => get(tutoringInfo),
  set: ({ set }, newTutoringInfo) => {
    set(tutoringInfo, newTutoringInfo);
  },
});
