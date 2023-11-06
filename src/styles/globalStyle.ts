import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};
  
    html,
    body {
    max-width: 100vw;
    min-height:100vh;
    overflow-x: hidden;
    }

  
  #root {
    margin: 0 auto;
  }
  
  html {
    font-size: 62.5%;
  }
  
 * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    }
  

  ul, ol {
  list-style: none;
  }

  body, button {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
    Helvetica Neue, sans-serif;
  }
  
  button {
    cursor: pointer;
    border: none;
    outline: none;
    background-color: transparent;
    -webkit-tap-highlight-color : transparent;
  }
  
  a, a:visited {
    text-decoration: none;
    color: black;
  }
`;

export default GlobalStyle;
