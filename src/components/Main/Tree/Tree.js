import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

import File from "./File";
import Folder from "./Folder";

const TreeWrapper = styled.div`
  line-height: 1.5; ;
`;

function Tree({ data, onNodeClick }) {
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
            />
          );
        }
        if (item.type === "folder") {
          return (
            <Folder key={item.id} id={item.id} name={item.name}>
              <Tree data={item.childrens} onNodeClick={onNodeClick} />
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
};

export default Tree;
