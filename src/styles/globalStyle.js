import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  html,
  body,
  #root {
    font-family: Inter, sans-serif;
  }

  #root {
    width: 100%;
    height: 100%;
    position: fixed;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
