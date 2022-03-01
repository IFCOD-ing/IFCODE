import React from "react";
import styled from "styled-components";

import MainNav from "../components/MainNav";
import MainPane from "../components/MainPane";

import PaneContainer from "../components/SplitPane/PaneContainer";

const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

function Main() {
  return (
    <MainWrapper>
      <MainNav />
      <MainPane>
        <PaneContainer viewType="vertical">
          <div className="pane-content">code</div>
          <PaneContainer viewType="horizontal">
            <div className="pane-content">view</div>
            <div className="pane-content">console</div>
          </PaneContainer>
        </PaneContainer>
      </MainPane>
    </MainWrapper>
  );
}

export default Main;
