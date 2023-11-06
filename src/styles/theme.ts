import { DefaultTheme } from 'styled-components';

const colors = {
  mainColor: '#2354D4',
  backgroundColor: '#F8F8F8',
  lightGray: '#EDEDED',
  gray: '#D9D9D9',
  darkGray: '#5F5F5F',
  red: '#EC5959',
  black: '#000000',
  white: '#FFFFFF',
  kakao: `#FFE812`,
} as const;

const theme = {
  colors,
} as const;

export default theme;
