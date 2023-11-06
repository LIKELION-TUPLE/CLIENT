import { selector } from 'recoil';
import { selectedDate, userName, userType } from './atom';

export const dateSelect = selector({
  key: 'dateSelect',
  get: ({ get }) => get(selectedDate),
  set: ({ set }, newDate) => {
    set(selectedDate, newDate);
  },
});

export const userNameSave = selector({
  key: 'userNameSave',
  get: ({ get }) => get(userName),
  set: ({ set }, newUserName) => {
    set(userName, newUserName);
  },
});

export const userTypeSave = selector({
  key: 'userTypeSave',
  get: ({ get }) => get(userName),
  set: ({ set }, newUserType) => {
    set(userType, newUserType);
  },
});
