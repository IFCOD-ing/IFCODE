import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyles from "../styles/globalStyle";
import theme from "../styles/theme";

import Header from "../components/common/Header";
import Main from "../pages/Main";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppWrapper>
        <Header />
        <Main />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
