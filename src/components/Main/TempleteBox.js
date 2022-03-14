import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TempleteWrapper = styled.div`
  padding: 10px;

  img {
    cursor: pointer;
  }
`;

function TempleteBox({ children }) {
  return <TempleteWrapper>{children}</TempleteWrapper>;
}

TempleteBox.propTypes = {
  children: PropTypes.node,
};

export default TempleteBox;
