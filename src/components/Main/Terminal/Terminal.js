import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TerminalWrapper = styled.div`
  .title {
    height: 20px;
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    top: 0;
    align-self: flex-start;
    padding: 20px;
    background-color: #0fd1c9;
    line-height: 5px;
    font-size: 20px;
  }

  .content {
    color: #fff;
  }
`;

function Terminal({ title, children }) {
  return (
    <TerminalWrapper>
      <div className="title">{title}</div>
      <div className="content">{children}</div>
    </TerminalWrapper>
  );
}

Terminal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Terminal;
