import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TabListWrapper = styled.div`
  display: flex;
  height: 40px;
  border-bottom: 1px solid #343434;
  overflow-x: auto;
  background-color: #151515;
  z-index: 1;

  &::-webkit-scrollbar {
    height: 1px;
  }
`;

function TabList({ children }) {
  console.log(children);

  return <TabListWrapper>{children}</TabListWrapper>;
}

TabList.propTypes = {
  children: PropTypes.node,
};

export default TabList;
