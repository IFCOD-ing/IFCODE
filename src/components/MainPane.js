import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const MainPaneWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

function MainPane({ children }) {
  return <MainPaneWrapper>{children}</MainPaneWrapper>;
}

MainPane.propTypes = {
  children: PropTypes.node,
};

export default MainPane;
