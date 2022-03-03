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

import CodeEditor from "../components/CodeEditor";

const MainWrapper = styled.div`
  display: flex;
  flex: 1 1 0;
  height: 100%;

  iframe {
    background-color: white;
  }

  .box {
    width: 100%;
    height: 400px;
    border-bottom: 1px solid #343434;

    .title-box {
      border-bottom: 1px solid #343434;
      height: 40px;
      line-height: 40px;
      margin-left: 20px;
      font-size: 20px;
    }
  }

  .console {
    background-color: black;
    position: fixed;
    width: 100%;
  }

  .view {
    width: 100%;
    height: 100%;
    background-color: #fff;
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
          <div className="title-box">File</div>
          <FileTree />
        </div>
      </MainNav>
      <MainPane>
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
        <PaneContainer viewType="vertical">
          <ContentContainer>
            <TabPanel index={0} toggleState={toggleState}>
              <CodeEditor language="javascript" value="" />
            </TabPanel>
            <TabPanel index={1} toggleState={toggleState}>
              <CodeEditor language="html" value="" />
            </TabPanel>
            <TabPanel index={2} toggleState={toggleState}>
              <CodeEditor language="css" value="" />
            </TabPanel>
          </ContentContainer>
          <PaneContainer viewType="horizontal">
            <ContentContainer>
              <iframe srcDoc="<h1>항이</h1>"></iframe>
            </ContentContainer>
            <ContentContainer>
              <div className="console">console</div>
              <div className="content"></div>
            </ContentContainer>
          </PaneContainer>
        </PaneContainer>
      </MainPane>
    </MainWrapper>
  );
}

export default Main;
