import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "../../common/Button";

const TerminalWrapper = styled.div`
  height: 87vh;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    align-self: flex-start;
    height: 20px;
    padding: 20px;
    background-color: #0fd1c9;
    font-size: 20px;
  }

  .content {
    overflow-y: auto;
    padding: 10px;
    color: #fff;
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
        <Button type="button" text="clear" onClick={onExtraButtonClick} />
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
