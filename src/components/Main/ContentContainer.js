import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #151515;
  color: white;
`;

function ContentContainer({ children }) {
  return <ContentBox>{children}</ContentBox>;
}

ContentContainer.propTypes = {
  children: PropTypes.node,
};

export default ContentContainer;
