import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LogWrapper = styled.div`
  p {
    margin-top: 10px;
    margin-left: 10px;
  }
`;

function Log({ content }) {
  return (
    <LogWrapper>
      <p>&gt; {content}</p>
    </LogWrapper>
  );
}

Log.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Log;
