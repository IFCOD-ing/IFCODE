import React from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import Tree from "./Tree/Tree";
import FileForm from "./FileForm";

function FileTree({ onFileClick }) {
  const file = useSelector((state) => state.file.structure);
  const updateFile = useSelector((state) => state.file.updateFile);

  return (
    <>
      <Tree data={file} onNodeClick={onFileClick} />
      <FileForm display={updateFile} />
    </>
  );
}

FileTree.propTypes = {
  onFileClick: PropTypes.func.isRequired,
};

export default FileTree;
