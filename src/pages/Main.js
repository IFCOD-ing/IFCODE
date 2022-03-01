import React, { useState } from "react";
import styled from "styled-components";

import MainNav from "../components/MainNav";
import MainPane from "../components/MainPane";

import PaneContainer from "../components/SplitPane/PaneContainer";
import ContentContainer from "../components/ContentContainer";

import TabList from "../components/Tabs/TabList";
import Tab from "../components/Tabs/Tab";
import TabPanel from "../components/Tabs/TabPanel";

import FileTree from "../components/FileTree";

const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  .box {
    width: 100%;
    height: 400px;
    border-bottom: 1px solid #343434;
  }
`;

function Main() {
  const [toggleState, setToggleState] = useState(0);

  function handleTabClick(index) {
    setToggleState(index);
  }

  return (
    <MainWrapper>
      <MainNav>
        <div className="box">
          <FileTree />
        </div>
      </MainNav>
      <MainPane>
        <PaneContainer viewType="vertical">
          <ContentContainer>
            <TabList>
              <Tab
                title="index.js"
                index={0}
                onClick={handleTabClick}
                toggleState={toggleState}
              />
              <Tab
                title="index.html"
                index={1}
                onClick={handleTabClick}
                toggleState={toggleState}
              />
              <Tab
                title="index.css"
                index={2}
                onClick={handleTabClick}
                toggleState={toggleState}
              />
            </TabList>
            <TabPanel index={0} toggleState={toggleState}>
              index.js
            </TabPanel>
            <TabPanel index={1} toggleState={toggleState}>
              index.html
            </TabPanel>
            <TabPanel index={2} toggleState={toggleState}>
              index.css
            </TabPanel>
          </ContentContainer>
          <PaneContainer viewType="horizontal">
            <ContentContainer>view</ContentContainer>
            <ContentContainer>console</ContentContainer>
          </PaneContainer>
        </PaneContainer>
      </MainPane>
    </MainWrapper>
  );
}

export default Main;
