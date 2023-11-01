import { selector } from 'recoil';
import { selectedDate } from './atom';
export const dateSelect = selector({
  key: 'dateSelect',
  get: ({ get }) => get(selectedDate),
  set: ({ set }, newDate) => {
    set(selectedDate, newDate);
  },
});
