import React from "react";
import { useSelector } from "react-redux";

import Tree from "./Tree/Tree";
import FileForm from "./FileForm";

function FileTree() {
  const file = useSelector((state) => state.file.structure);
  const updateFile = useSelector((state) => state.file.updateFile);

  return (
    <>
      <Tree data={file} />
      <FileForm display={updateFile} />
    </>
  );
}

export default FileTree;
