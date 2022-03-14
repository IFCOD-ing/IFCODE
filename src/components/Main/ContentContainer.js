import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.backgroundColor};
  color: #fff;
`;

function ContentContainer({ children }) {
  return <ContentBox>{children}</ContentBox>;
}

ContentContainer.propTypes = {
  children: PropTypes.node,
};

export default ContentContainer;
