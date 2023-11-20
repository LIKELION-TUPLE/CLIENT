import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined;
const { persistAtom } = recoilPersist({
  key: 'recoil-states',
  storage: localStorage,
});

export interface User {
  name?: string;
  type?: string;
}
export interface Tutoring {
  name?: string;
  subject?: string;
  code?: string;
}

export const selectedDate = atom<string>({
  key: 'selectedDate',
  default: '',
});

export const userInfo = atom<User>({
  key: `userInfo`,
  default: { name: '', type: '' },
  effects_UNSTABLE: [persistAtom],
});

export const tutoringInfo = atom<Tutoring>({
  key: `tutoringInfo`,
  default: { name: '', subject: '', code: '' },
  effects_UNSTABLE: [persistAtom],
});
