import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  margin: 5px;
  border: 0;
  outline: 0;
  background-color: #343434;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #0fd1c9;
  }
`;

function Button({ type, text, onClick }) {
  return (
    <StyledButton type={type} onClick={onClick}>
      {text}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
