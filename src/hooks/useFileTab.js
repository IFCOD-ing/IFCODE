import { useState } from "react";

import { findFileById } from "../helper/searchDfs";

function useFileTab(fileTree) {
  const [fileTabInfo, setFileTabInfo] = useState({});
  const [selectedFile, setSelectedFile] = useState({});

  function handleFileClick(id) {
    const clickedFileInfo = findFileById(fileTree, id);

    setFileTabInfo({ ...fileTabInfo, [id]: clickedFileInfo });
    setSelectedFile(clickedFileInfo);
  }

  function handleTabClick(fileId) {
    const selectedFile = findFileById(fileTree, fileId);
    setSelectedFile(selectedFile);
  }

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

  return {
    fileTabInfo,
    selectedFile,
    setFileTabInfo,
    setSelectedFile,
    handleFileClick,
    handleTabClick,
    handleCloseTab,
  };
}

export default useFileTab;
