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
} as const;

function FONT({ weight, size, lineHeight, letterSpacing }) {
  return `
      font-family: 'pretendard', sans-serif;
      font-weight: ${weight};
      font-style: normal;
      font-size: ${size}rem;
      line-height: ${lineHeight}rem;
      ${letterSpacing && `letter-spacing: -0.0${letterSpacing}rem;`}
  `;
}
const fonts = {} as const;
const theme = {
  colors,
  fonts,
} as const;

export default theme;
