import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

const ButtonWrapper = styled.div`
  svg {
    vertical-align: middle;
  }
`;

function CloseButton({ onClick }) {
  return (
    <ButtonWrapper>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
      >
        <path
          d="M9.428 8L12 10.573 10.572 12 8 9.428 5.428 12 4 10.573 6.572 8 4 5.428 5.427 4 8 6.572 10.573 4 12 5.428 9.428 8z"
          fill="#E8E8E8"
        />
      </svg>
    </ButtonWrapper>
  );
}

CloseButton.propTypes = {
  onClick: PropTypes.func,
};

export default CloseButton;
