import React from "react";
import styled from "styled-components";

import MainNav from "../components/MainNav";
import MainPane from "../components/MainPane";

const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

function Main() {
  return (
    <MainWrapper>
      <MainNav />
      <MainPane />
    </MainWrapper>
  );
}

export default Main;
