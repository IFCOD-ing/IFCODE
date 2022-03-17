import { useState, useEffect } from "react";

import javascript from "../templeteData/javascript.json";
import react from "../templeteData/react.json";
import reactSample from "../templeteData/reactSample.json";
import redux from "../templeteData/redux.json";
import reduxSample from "../templeteData/reduxSample.json";

import {
  createNodeId,
  addNewFileById,
  editFileOrFolderName,
  delteFileOrFolderName,
  getAllFiles,
} from "../helper/main/fileTreeHelper";
import { validationInputText } from "../helper/main/validate";

function useFileTree(
  fileTree,
  setFileTree,
  setFileTabInfo,
  setSelectedFile,
  setSrcDoc,
  fileTabInfo,
  handleCloseTab
) {
  const [templete, setTemplete] = useState("javascript");

  const [isFileFormShow, setIsFileFormShow] = useState(false);
  const [updateNodeInfo, setUpdateNodeInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let baseFile;

    if (templete === "javascript" || templete === "javascript sample") {
      baseFile = javascript;
    }

    if (templete === "react") {
      baseFile = react;
    }

    if (templete === "redux") {
      baseFile = redux;
    }

    if (templete === "react sample") {
      baseFile = reactSample;
    }

    if (templete === "redux sample") {
      baseFile = reduxSample;
    }

    setFileTree(createNodeId(baseFile));
    setFileTabInfo({});
    setSelectedFile({});
    setSrcDoc(``);
  }, [templete]);

  function handleFileAddButtonClick(folderId) {
    setIsFileFormShow(true);
    setUpdateNodeInfo({ type: "file", id: folderId, action: "new" });
  }

  function handleFolderAddButtonClick(folderId) {
    setIsFileFormShow(true);
    setUpdateNodeInfo({ type: "folder", id: folderId, action: "new" });
  }

  function handleFileEditButtonClick(fileId) {
    setIsFileFormShow(true);
    setUpdateNodeInfo({ type: "file", id: fileId, action: "edit" });
  }

  function handleFolderEditButtonClick(fileId) {
    setIsFileFormShow(true);
    setUpdateNodeInfo({ type: "folder", id: fileId, action: "edit" });
  }

  function handleFileDeleteButtonClick(fileId) {
    const { updatedFileTree } = delteFileOrFolderName(fileTree, fileId);

    setFileTree(updatedFileTree);
    handleCloseTab(fileId);
  }

  function handleFolderDeleteButtonClick(folderId) {
    const { updatedFileTree, removedFolder } = delteFileOrFolderName(
      fileTree,
      folderId
    );

    const childrenFiles = getAllFiles(removedFolder);

    childrenFiles.forEach((value) => {
      delete fileTabInfo[value];
    });

    setFileTree(updatedFileTree);
    setFileTabInfo(fileTabInfo);
    setSelectedFile({});
  }

  function handleCancelFileButtonClick() {
    setIsFileFormShow(false);
    setErrorMessage("");
  }

  function handleFileFormSubmit(event) {
    event.preventDefault();

    const fileName = event.target.fileName.value;
    const validationResult = validationInputText(fileName, updateNodeInfo.type);

    if (validationResult) {
      setErrorMessage(validationResult);
      event.target.fileName.value = "";

      return;
    }

    let result;

    if (updateNodeInfo.action === "edit") {
      result = editFileOrFolderName(fileTree, updateNodeInfo.id, fileName);
      handleCloseTab(updateNodeInfo.id);
    }

    if (updateNodeInfo.action === "new") {
      result = addNewFileById(
        fileTree,
        updateNodeInfo.id,
        fileName,
        updateNodeInfo.type,
        updateNodeInfo.action
      );
    }

    if (updateNodeInfo.action === "delete") {
      result = delteFileOrFolderName(fileTree, updateNodeInfo.id);
    }

    const newFileTree = result;

    if (typeof newFileTree === "string") {
      setErrorMessage(newFileTree);
      event.target.fileName.value = "";
      return;
    }

    setFileTree(newFileTree);
    setIsFileFormShow(false);
    setUpdateNodeInfo("");

    event.target.fileName.value = "";
  }

  return {
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
  };
}

export default useFileTree;
