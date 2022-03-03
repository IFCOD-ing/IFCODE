import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { openFile, updateSelectedFile } from "../features/file/fileSlice";

import MainNav from "../components/Main/MainNav";
import MainPane from "../components/Main/MainPane";

import PaneContainer from "../components/Main/SplitPane/PaneContainer";
import ContentContainer from "../components/Main/ContentContainer";

import TabList from "../components/Main/Tabs/TabList";
import Tab from "../components/Main/Tabs/Tab";
import TabPanel from "../components/Main/Tabs/TabPanel";

import FileTree from "../components/Main/FileTree";
import CodeEditor from "../components/Main/CodeEditor";

function Main() {
  const openedFile = useSelector((state) => state.file.openedFile);
  const selectedFile = useSelector((state) => state.file.selectedFile);

  const dispatch = useDispatch();

  function handleFileClick(id) {
    dispatch(openFile({ id }));
  }

  function handleTabClick(id) {
    dispatch(updateSelectedFile({ id }));
  }

  const openedFileList = Object.entries(openedFile);

  let selectedFileType;

  if (selectedFile.name) {
    selectedFileType = selectedFile.name.split(".")[1];
  }

  return (
    <MainWrapper>
      <MainNav>
        <div className="box">
          <div className="title-box">
            <span>File</span>
            <button className="run-button">run</button>
          </div>
          <FileTree onFileClick={handleFileClick} />
        </div>
      </MainNav>
      <MainPane>
        <TabList>
          {openedFileList.map(([key, value]) => {
            return (
              <Tab
                key={key}
                id={key}
                tabState={selectedFile.id}
                title={value.name}
                onClick={() => handleTabClick(key)}
              />
            );
          })}
        </TabList>
        <PaneContainer viewType="vertical">
          <ContentContainer>
            <TabPanel>
              {selectedFile.name && (
                <CodeEditor
                  language={selectedFileType}
                  value={selectedFile.content}
                />
              )}
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #343434;
      height: 40px;
      line-height: 40px;
      margin-left: 20px;
      font-size: 20px;
      margin-right: 20px;

      .run-button {
        height: 20px;
        width: 40px;
      }
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

export default Main;
