import React, { useEffect, useState } from "react";
import styled from "styled-components";

import useFileTree from "../hooks/useFileTree";
import useFileTab from "../hooks/useFileTab";
import useDependency from "../hooks/useDependency";

import { updateFileContent } from "../helper/searchDfs";
import { setViewRender } from "../helper/setViewRender";

import javascriptSvg from "../assets/images/javascript.svg";
import reactSvg from "../assets/images/react.svg";

import MainNav from "../components/Main/MainNav";
import Menu from "../components/Main/Menu";
import FileMenuSub from "../components/Main/FileMenuSub";
import MainPane from "../components/Main/MainPane";

import DependencyBox from "../components/Main/DependencyBox";

import PaneContainer from "../components/Main/SplitPane/PaneContainer";
import ContentContainer from "../components/Main/ContentContainer";

import TabList from "../components/Main/Tabs/TabList";
import Tab from "../components/Main/Tabs/Tab";
import TabPanel from "../components/Main/Tabs/TabPanel";

import CodeEditor from "../components/Main/CodeEditor";
import WebView from "../components/Main/WebView";
import Tree from "../components/Main/Tree/Tree";
import FileForm from "../components/Main/FileForm";

import Terminal from "../components/Main/Terminal/Terminal";
import Log from "../components/Main/Terminal/Log";
import CloseButton from "../components/common/CloseButton";

function Main() {
  const [fileTree, setFileTree] = useState([]);
  const [inputCode, setInputCode] = useState(null);
  const [runCount, setRunCount] = useState(0);
  const [srcDoc, setSrcDoc] = useState(``);
  const [logList, setLogList] = useState([]);

  const {
    fileTabInfo,
    selectedFile,
    setFileTabInfo,
    setSelectedFile,
    handleFileClick,
    handleTabClick,
    handleCloseTab,
  } = useFileTab(fileTree);

  const {
    templete,
    isFileFormShow,
    errorMessage,
    setTemplete,
    handleFileAddButtonClick,
    handleFolderAddButtonClick,
    handleFileFormSubmit,
    handleCancelFileButtonClick,
    handleFileEditButtonClick,
    handleFolderEditButtonClick,
    handleFileDeleteButtonClick,
    handleFolderDeleteButtonClick,
  } = useFileTree(
    fileTree,
    setFileTree,
    setFileTabInfo,
    setSelectedFile,
    setSrcDoc,
    fileTabInfo,
    handleCloseTab
  );

  const {
    dependencyInfo,
    isDependencyFormShow,
    dependencyFormErrorMessage,
    handleDependencyAddButtonClick,
    handleDependencyFormCancelButtonClick,
    addNewDependency,
    handleDependencyDeleteButtonClick,
  } = useDependency();

  useEffect(() => {
    if (inputCode === null || inputCode === "") {
      return;
    }

    const newFileTree = updateFileContent(fileTree, selectedFile.id, inputCode);
    selectedFile.content = inputCode;

    setFileTree(newFileTree);
    setSelectedFile({ ...selectedFile });
    setInputCode("");
  }, [inputCode]);

  useEffect(() => {
    if (!runCount) {
      return;
    }

    const viewOption = {
      javascript: {
        templete: "javascript",
        htmlPath: "index.html",
        entryPointPath: "",
      },
      react: {
        templete: "react",
        htmlPath: "public/index.html",
        entryPointPath: "src/index.js",
      },
    };

    const doc = setViewRender(fileTree, viewOption[templete], dependencyInfo);

    setSrcDoc(doc);
  }, [runCount]);

  useEffect(() => {
    function displayLogMessage(response) {
      if (response.data && response.data.source === "iframe") {
        setLogList((prevState) => [...prevState, response.data.log]);
      }
    }

    window.addEventListener("message", displayLogMessage);

    return () => {
      window.removeEventListener("message", displayLogMessage);
    };
  }, []);

  function handleRunButtonClick() {
    setRunCount(runCount + 1);
  }

  function handleChangeCode(value) {
    setInputCode(value);
  }

  function handleClearButtonClick() {
    setLogList([]);
  }

  function handleJavscriptClick() {
    setTemplete("javascript");
  }

  function handleReactClick() {
    setTemplete("react");
  }

  const fileTabInfoList = Object.entries(fileTabInfo);
  const dependencyInfoList = Object.keys(dependencyInfo);

  return (
    <MainWrapper>
      <MainNav>
        <Menu title="Templete">
          <div>
            <img src={javascriptSvg} onClick={handleJavscriptClick}></img>
            <img src={reactSvg} onClick={handleReactClick}></img>
          </div>
        </Menu>
        <Menu
          title="File"
          titleExtend={
            <FileMenuSub
              onFolderAddButtonClick={() => handleFolderAddButtonClick("root")}
              onFileAddButtonClick={() => handleFileAddButtonClick("root")}
            />
          }
          titleSub={
            <button className="run-button" onClick={handleRunButtonClick}>
              run
            </button>
          }
        >
          <Tree
            data={fileTree}
            onNodeClick={handleFileClick}
            onAddFile={handleFileAddButtonClick}
            onAddFolder={handleFolderAddButtonClick}
            onEditFile={handleFileEditButtonClick}
            onEditFolder={handleFolderEditButtonClick}
            onDeleteFile={handleFileDeleteButtonClick}
            onDeleteFolder={handleFolderDeleteButtonClick}
          />
          <FileForm
            isShow={isFileFormShow}
            onSubmitFile={handleFileFormSubmit}
            onCancel={handleCancelFileButtonClick}
            errorMessage={errorMessage}
            placeholderText="input file or folder name"
          />
        </Menu>
        <Menu
          title="dependency"
          titleSub={
            <button
              className="add-button"
              onClick={handleDependencyAddButtonClick}
            >
              add
            </button>
          }
        >
          <FileForm
            isShow={isDependencyFormShow}
            onSubmitFile={addNewDependency}
            onCancel={handleDependencyFormCancelButtonClick}
            errorMessage={dependencyFormErrorMessage}
            placeholderText="input CDN link"
          />
          <div className="dependency-wrapper">
            {dependencyInfoList.map((value) => (
              <DependencyBox key={value} title={value}>
                <CloseButton
                  onClick={() => handleDependencyDeleteButtonClick(value)}
                />
              </DependencyBox>
            ))}
          </div>
        </Menu>
      </MainNav>
      <MainPane>
        <TabList>
          {fileTabInfoList.map(([key, value]) => {
            return (
              <Tab
                key={key}
                id={key}
                tabState={selectedFile.id}
                title={value.name}
                onClick={() => handleTabClick(key)}
                onClose={() => handleCloseTab(key)}
              />
            );
          })}
        </TabList>
        <PaneContainer viewType="vertical">
          <ContentContainer>
            <TabPanel>
              {selectedFile.name && (
                <CodeEditor
                  file={selectedFile}
                  onContentChange={handleChangeCode}
                />
              )}
            </TabPanel>
          </ContentContainer>
          <PaneContainer viewType="horizontal">
            <ContentContainer>
              <WebView document={srcDoc} run={runCount} />
            </ContentContainer>
            <ContentContainer>
              <Terminal
                title="console"
                onExtraButtonClick={handleClearButtonClick}
              >
                {logList.map((value, index) => (
                  <Log key={index.toString() + value} content={value} />
                ))}
              </Terminal>
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

  .dependency-wrapper {
    padding: 0 10px;
  }

  .view {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
`;

export default Main;
