import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      mainColor: string;
      backgroundColor: string;
      lightGray: string;
      gray: string;
      darkGray: string;
      red: string;
      black: string;
      white: string;
    };
  }
}
