import React from "react";
import styled from "styled-components";

import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import "react-reflex/styles.css";

const MainPaneWrapper = styled.div`
  width: 100%;
  height: 100%;

  .pane-content {
    width: 100%;
    height: 100%;
    background-color: #151515;
    color: white;
  }

  .splitter {
    border: 2px solid #343434 !important;
  }
`;

function MainPane() {
  return (
    <MainPaneWrapper>
      <ReflexContainer orientation="vertical">
        <ReflexElement className="left-pane">
          <div className="pane-content">code</div>
        </ReflexElement>
        <ReflexSplitter className="splitter" />
        <ReflexElement className="right-pane">
          <ReflexContainer orientation="horizontal">
            <ReflexElement className="left-pane">
              <div className="pane-content">view</div>
            </ReflexElement>
            <ReflexSplitter className="splitter" />
            <ReflexElement className="right-pane">
              <div className="pane-content">console</div>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>
      </ReflexContainer>
    </MainPaneWrapper>
  );
}

export default MainPane;
