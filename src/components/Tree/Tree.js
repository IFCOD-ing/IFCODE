import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

import File from "./File";
import Folder from "./Folder";

const TreeWrapper = styled.div`
  line-height: 1.5; ;
`;

function Tree({ data }) {
  return (
    <TreeWrapper>
      {data.map((item) => {
        if (item.type === "file") {
          return <File name={item.name} />;
        }
        if (item.type === "folder") {
          return (
            <Folder name={item.name}>
              <Tree data={item.childrens} />
            </Folder>
          );
        }
      })}
    </TreeWrapper>
  );
}

Tree.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Tree;
