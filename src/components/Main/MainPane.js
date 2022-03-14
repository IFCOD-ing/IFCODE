import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const MainPaneWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.backgroundColor};
`;

function MainPane({ children }) {
  return <MainPaneWrapper>{children}</MainPaneWrapper>;
}

MainPane.propTypes = {
  children: PropTypes.node,
};

export default MainPane;
