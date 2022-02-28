import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    font-family: Inter, sans-serif;
  }

  div {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
