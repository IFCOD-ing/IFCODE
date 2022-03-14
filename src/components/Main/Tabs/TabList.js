import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TabListWrapper = styled.div`
  display: flex;
  z-index: 1;
  overflow-x: scroll;
  width: 80vw;
  height: 5vh;
  border-bottom: 1px solid ${(props) => props.theme.mainColor};
  background-color: ${(props) => props.theme.backgroundColor};

  &::-webkit-scrollbar {
    height: 1px;
  }
`;

function TabList({ children }) {
  return <TabListWrapper>{children}</TabListWrapper>;
}

TabList.propTypes = {
  children: PropTypes.node,
};

export default TabList;
