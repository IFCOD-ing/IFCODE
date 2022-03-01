import React from "react";
import { useSelector } from "react-redux";

import Tree from "./Tree/Tree";

function FileTree() {
  const file = useSelector((state) => state.file.structure);

  return <Tree data={file} />;
}

export default FileTree;
