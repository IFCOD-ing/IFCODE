import React, { useEffect, useState } from "react";
import styled from "styled-components";

import file from "../file.json";
import react from "../react.json";

import {
  findFileById,
  createStructureId,
  addNewFileById,
  updateFileContent,
} from "../helper/searchDfs";

import { setViewRender } from "../helper/setViewRender";

import { validationInputText } from "../helper/validate";

import javascriptSvg from "../assets/images/javascript.svg";
import reactSvg from "../assets/images/react.svg";

import MainNav from "../components/Main/MainNav";
import Menu from "../components/Main/Menu";
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
  // templete type
  const [templete, setTemplete] = useState("javascript");

  // 파일 구조 레더링
  const [fileTree, setFileTree] = useState([]);

  // 탭에 파일 추가
  const [fileTabInfo, setFileTabInfo] = useState({});
  const [selectedFile, setSelectedFile] = useState({});

  // fireform
  const [isFileFormShow, setIsFileFormShow] = useState(false);
  const [updateFolderId, setUpdateFolderId] = useState({});

  // dependency form
  const [isDependencyFormShow, setIsDependencyFormShow] = useState(false);
  const [dependencyFormErrorMessage, setDependencyFormErrorMessage] =
    useState("");

  // dependency List
  const [dependencyInfo, setDependencyInfo] = useState({});

  // inputCode
  const [inputCode, setInputCode] = useState(null);

  // 실행
  const [runCount, setRunCount] = useState(0);
  const [srcDoc, setSrcDoc] = useState(``);

  // log
  const [logList, setLogList] = useState([]);

  // fileForm 에러 메세지
  const [errorMessage, setErrorMessage] = useState("");

  // 템플릿 파잁 트리 변경
  useEffect(() => {
    let baseFile;

    if (templete === "javascript") {
      baseFile = file;
    }

    if (templete === "react") {
      baseFile = react;
    }

    const fileInfo = createStructureId(baseFile);
    setFileTree(fileInfo);
    setFileTabInfo({});
    setSelectedFile({});
    setSrcDoc(``);
  }, [templete]);

  // 사용자가 코드 입력시 해당 코드 상태 저장
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
        entryPointPath: "src/index.js",
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
    setIsFileFormShow("file");
    setUpdateFolderId({ type: "file", id: folderId });
  }

  // 폴더 추가
  function handleFolderAddButtonClick(folderId) {
    setIsFileFormShow("folder");
    setUpdateFolderId({ type: "folder", id: folderId });
  }

  // file from 취소 버튼 클릭
  function handleCancelFileButtonClick() {
    setIsFileFormShow(false);
  }

  // file sumbit 파일 생성 버튼 클릭
  function addNewFile(event) {
    event.preventDefault();
    const fileName = event.target.fileName.value;

    const validationResult = validationInputText(fileName, updateFolderId.type);

    if (validationResult) {
      setErrorMessage(validationResult);
      event.target.fileName.value = "";
      return;
    }

    const newFileTree = addNewFileById(
      fileTree,
      updateFolderId.id,
      fileName,
      isFileFormShow
    );

    if (typeof newFileTree === "string") {
      setErrorMessage(newFileTree);
      event.target.fileName.value = "";
      return;
    }

    setFileTree(newFileTree);
    setIsFileFormShow(false);
    setUpdateFolderId("");

    event.target.fileName.value = "";
  }

  // 디펜던기 form show
  function handleDependencyAddButtonClick() {
    setIsDependencyFormShow(true);
  }

  // 디펜던시 취소
  function handleDependencyFormCancelButtonClick() {
    setIsDependencyFormShow(false);
  }

  // 디펜던시 추가 버튼
  function addNewDependency(event) {
    event.preventDefault();
    const dependency = event.target.fileName.value;

    const dependencyName = dependency.slice(dependency.indexOf(".dev/") + 5);

    if (dependencyInfo[dependencyName]) {
      setDependencyFormErrorMessage("이미 등록된 디펜던시 입니다.");
      event.target.fileName.value = "";
      return;
    }

    setDependencyInfo({ ...dependencyInfo, [dependencyName]: dependency });
    event.target.fileName.value = "";
  }

  function handleDependencyDeleteButtonClick(dependency) {
    delete dependencyInfo[dependency];
    setDependencyInfo({ ...dependencyInfo });
  }

  // 탭 클릭 파일 내용 변환
  function handleTabClick(fileId) {
    const selectedFile = findFileById(fileTree, fileId);
    setSelectedFile(selectedFile);
  }

  // 탭 삭제
  function handleCloseTab(fileId) {
    delete fileTabInfo[fileId];

    if (selectedFile.id === fileId) {
      const fileTabList = Object.keys(fileTabInfo);

      if (!fileTabList.length) {
        setSelectedFile({});
        return;
      }

      const lastTabInfoKey = fileTabList[fileTabList.length - 1];
      const clickedFileInfo = findFileById(fileTree, lastTabInfoKey);

      setSelectedFile(clickedFileInfo);
    }

    setFileTabInfo({ ...fileTabInfo });
  }

  // 파일내 content 변경 반영
  function handleChangeCode(value, id) {
    setInputCode(value);
  }

  // log 기록 초기화
  function handleClearButtonClick() {
    setLogList([]);
  }

  function handleJavscriptClick() {
    setTemplete("javascript");
  }

  function handleReactClick() {
    setTemplete("react");
  }

  // 객체 트리구조 배열로 변환
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
          />
          <FileForm
            isShow={isFileFormShow}
            onSubmitFile={addNewFile}
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
