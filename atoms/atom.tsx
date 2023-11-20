import { atom } from 'recoil';
interface User {
  name?: string;
  type?: string;
}
interface Tutoring {
  name?: string;
  subject?: string;
}

export const selectedDate = atom<string>({
  key: 'selectedDate',
  default: '',
});

export const userInfo = atom<User>({
  key: `userInfo`,
  default: { name: '', type: '' },
});

export const tutoringInfo = atom<Tutoring>({
  key: `tutoringInfo`,
  default: { name: '', subject: '' },
});

export const userToken = atom<string>({
  key: `userToken`,
  default: '',
});
