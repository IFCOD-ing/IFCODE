import React, { useEffect, useState } from "react";
import styled from "styled-components";

import file from "../file.json";
import {
  findFileById,
  findRenderFile,
  createStructureId,
  addNewFileById,
  updateFileContent,
} from "../helper/searchDfs";

import MainNav from "../components/Main/MainNav";
import MainPane from "../components/Main/MainPane";

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

function Main() {
  // 파일 구조 레더링
  const [fileTree, setFileTree] = useState([]);

  // 탭에 파일 추가
  const [fileTabInfo, setFileTabInfo] = useState({});
  const [selectedFile, setSelectedFile] = useState({});

  // fireform
  const [isFileFormShow, setIsFileFormShow] = useState(false);
  const [updateFolderId, setUpdateFolderId] = useState("");

  // inputCode
  const [inputCode, setInputCode] = useState(null);

  // 실행
  const [runCount, setRunCount] = useState(0);
  const [srcDoc, setSrcDoc] = useState(``);

  // log
  const [logList, setLogList] = useState([]);

  // json 파일 트리 구조로 변환
  useEffect(() => {
    const fileInfo = createStructureId(file);
    setFileTree(fileInfo);
  }, []);

  // 사용자가 코드 입력시 해당 코드 상태 저장
  useEffect(() => {
    if (inputCode === null) {
      return;
    }

    const newFileTree = updateFileContent(fileTree, selectedFile.id, inputCode);
    setFileTree(newFileTree);
  }, [inputCode]);

  useEffect(() => {
    if (!runCount) {
      return;
    }

    const html = findRenderFile(fileTree, "index.html");
    const css = findRenderFile(fileTree, "styles.css");
    const script = findRenderFile(fileTree, "index.js");

    const logScript = `
      const logMessage = function (message) {
        window.parent.postMessage({ source: "iframe", log: message }, '*');
      }

      function add(something) {
        logMessage(something.toString());
      };

      const originalError = console.error;
      const originalLog = console.log;
      const originalWarning = console.warn;
      const originalInfo = console.info;
      const originalClear = console.clear;

      console.error = function (error) {
        add(error.toString() + error.stack);
        originalError.apply(console, arguments);
      };
      console.log = function (...args) {
        args.forEach(add);
        originalLog.apply(console, args);
      };
      console.warn = function (...args) {
        args.forEach(add);
        originalWarning.apply(console, args);
      };
      console.info = function (...args) {
        args.forEach(add);
        originalInfo.apply(console, args);
      };
      console.clear = function (...args) {
        element.innerHTML = '';
        originalClear.apply(console, args);
      };
    `;

    const doc = `
      <html>
        <style>${css}</style>
        <body>
          ${html}
        <body>
        <script>
          ${logScript}
          ${script}
        </script>
      <html>
    `;

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

  // 실행 버튼 클릭
  function handleRunButtonClick() {
    setRunCount(runCount + 1);
  }

  // 파일 클릭시 탭에 추가
  function handleFileClick(id) {
    const clickedFileInfo = findFileById(fileTree, id);
    setFileTabInfo({ ...fileTabInfo, [id]: clickedFileInfo });
    setSelectedFile(clickedFileInfo);
  }

  // 폴더에서 파일 추가 버튼 클릭시 file form show
  function handleFileAddButtonClick(folderId) {
    setIsFileFormShow(true);
    setUpdateFolderId(folderId);
  }

  // file from 취소 버튼 클릭
  function handleCancelFileButtonClick() {
    setIsFileFormShow(false);
  }

  // file sumbit 파일 생성 버튼 클릭
  function addNewFile(event) {
    event.preventDefault();
    const fileName = event.target.fileName.value;
    const newFileTree = addNewFileById(fileTree, updateFolderId, fileName);

    setFileTree(newFileTree);
    setIsFileFormShow(false);
    setUpdateFolderId("");

    event.target.fileName.value = "";
  }

  // 탭 클릭 파일 내용 변환
  function handleTabClick(fileId) {
    const selectedFile = findFileById(fileTree, fileId);
    setSelectedFile(selectedFile);
  }

  // 파일내 content 변경 반영
  function handleChangeCode(value, id) {
    setInputCode(value);
  }

  function handleClearButtonClick() {
    setLogList([]);
  }

  // 객체 트리구조 배열로 변환
  const fileTabInfoList = Object.entries(fileTabInfo);

  return (
    <MainWrapper>
      <MainNav>
        <div className="box">
          <div className="title-box">
            <span>File</span>
            <button className="run-button" onClick={handleRunButtonClick}>
              run
            </button>
          </div>
          <Tree
            data={fileTree}
            onNodeClick={handleFileClick}
            onAddFile={handleFileAddButtonClick}
          />
          <FileForm
            isShow={isFileFormShow}
            onSubmitFile={addNewFile}
            onCancel={handleCancelFileButtonClick}
          />
        </div>
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
              <WebView document={srcDoc} />
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

  .view {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
`;

export default Main;
