import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/globalStyle";
import theme from "../styles/theme";

import Header from "../components/common/Header";
import Main from "../pages/Main";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Main />
    </ThemeProvider>
  );
}

export default App;
