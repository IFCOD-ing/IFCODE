import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TerminalWrapper = styled.div`
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20px;
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    top: 0;
    align-self: flex-start;
    padding: 20px;
    background-color: #0fd1c9;
    /* line-height: 5px; */
    font-size: 20px;
  }

  .content {
    padding: 10px;
    color: #fff;
    overflow-y: auto;
  }

  button {
    height: 20px;
  }
`;

function Terminal({ title, children, onExtraButtonClick }) {
  return (
    <TerminalWrapper>
      <div className="title">
        {title}
        <button onClick={onExtraButtonClick}>clear</button>
      </div>
      <div className="content">{children}</div>
    </TerminalWrapper>
  );
}

Terminal.propTypes = {
  title: PropTypes.string.isRequired,
  onExtraButtonClick: PropTypes.func,
  children: PropTypes.node,
};

export default Terminal;
