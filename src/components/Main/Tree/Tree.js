import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import File from "./File";
import Folder from "./Folder";

const TreeWrapper = styled.div`
  line-height: 1.5; ;
`;

function Tree({
  data,
  onNodeClick,
  onAddFile,
  onAddFolder,
  onEditFile,
  onEditFolder,
  onDeleteFile,
  onDeleteFolder,
}) {
  return (
    <TreeWrapper>
      {data.map((item) => {
        if (item.type === "file") {
          return (
            <File
              key={item.id}
              id={item.id}
              name={item.name}
              onClick={() => onNodeClick(item.id)}
              onClickFileEditButton={() => onEditFile(item.id)}
              onClickFileDeleteButton={() => onDeleteFile(item.id)}
            />
          );
        }
        if (item.type === "folder") {
          return (
            <Folder
              key={item.id}
              name={item.name}
              onClickFileAddButton={() => onAddFile(item.id)}
              onClickFolderAddButton={() => onAddFolder(item.id)}
              onClickFolderEditButton={() => onEditFolder(item.id)}
              onClickFolderDeleteButton={() => onDeleteFolder(item.id)}
            >
              <Tree
                data={item.childrens}
                onNodeClick={onNodeClick}
                onAddFile={onAddFile}
                onAddFolder={onAddFolder}
                onEditFile={onEditFile}
                onEditFolder={onEditFolder}
                onDeleteFile={onDeleteFile}
                onDeleteFolder={onDeleteFolder}
              />
            </Folder>
          );
        }
      })}
    </TreeWrapper>
  );
}

Tree.propTypes = {
  data: PropTypes.array.isRequired,
  onNodeClick: PropTypes.func,
  onAddFile: PropTypes.func,
  onAddFolder: PropTypes.func,
  onEditFile: PropTypes.func,
  onEditFolder: PropTypes.func,
  onDeleteFile: PropTypes.func,
  onDeleteFolder: PropTypes.func,
};

export default Tree;
