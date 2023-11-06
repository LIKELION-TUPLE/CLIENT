import { DefaultTheme } from 'styled-components';

const colors = {
  mainColor: '#2354D4',
  backgroundColor: '#F8F8F8',
  lightGray: '#EDEDED',
  gray: '#D9D9D9',
  middleGray: '#757575',
  darkGray: '#5F5F5F',
  red: '#EC5959',
  black: '#000000',
  white: '#FFFFFF',
  kakao: `#FFE812`,
} as const;

interface FontProps {
  weight: number;
  size: number;
  lineHeight?: string;
  letterSpacing?: number;
}
function FONT({ weight, size, lineHeight, letterSpacing }: FontProps): string {
  return `
      font-family: 'Noto Sans KR', sans-serif;
      font-weight: ${weight};
      font-style: normal;
      font-size: ${size}rem;
      line-height: ${lineHeight};
      ${letterSpacing && `letter-spacing: -0.0${letterSpacing}rem;`}
  `;
}
// 700 : bold, 500 : medium, 400 : regular
const fonts = {
  headline: FONT({ weight: 700, size: 2.4, lineHeight: 'normal' }),
  subheadline: FONT({ weight: 700, size: 2, lineHeight: 'normal' }),
  title_bold: FONT({ weight: 700, size: 1.8, lineHeight: 'normal' }),
  title_medium: FONT({ weight: 500, size: 1.8, lineHeight: 'normal' }),
  title_regular: FONT({ weight: 400, size: 1.8, lineHeight: 'normal' }),
  subtitle_medium: FONT({ weight: 500, size: 1.6, lineHeight: 'normal' }),
  text01_medium: FONT({ weight: 500, size: 1.5, lineHeight: 'normal' }),
  text01_regular: FONT({ weight: 400, size: 1.5, lineHeight: 'normal' }),
  text02_bold: FONT({ weight: 700, size: 1.2, lineHeight: 'normal' }),
  text02_medium: FONT({ weight: 500, size: 1.2, lineHeight: 'normal' }),
  text02_regular: FONT({ weight: 400, size: 1.2, lineHeight: 'normal' }),
  text03_medium: FONT({ weight: 500, size: 1, lineHeight: 'normal' }),
  text03_regular: FONT({ weight: 400, size: 1, lineHeight: 'normal' }),
} as const;

const theme = {
  colors,
  fonts,
} as const;

export default theme;
