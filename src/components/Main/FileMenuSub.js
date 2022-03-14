import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { AiOutlineFolderAdd, AiOutlineFileAdd } from "react-icons/ai";

const SubWrapper = styled.div`
  .title-actions {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    opacity: 0;
    pointer-events: none;
    transition: 0.2s;

    svg {
      cursor: pointer;
      margin-left: 10px;
      transform: scale(1);
      transition: 0.2s;

      :hover {
        transform: scale(1.1);
      }
    }
  }

  &:hover .title-actions {
    opacity: 1;
    pointer-events: all;
    transition: 0.2s;
  }
`;

function FileMenuSub({ onFolderAddButtonClick, onFileAddButtonClick }) {
  return (
    <SubWrapper>
      <div className="title-actions">
        <AiOutlineFolderAdd onClick={onFolderAddButtonClick} />
        <AiOutlineFileAdd onClick={onFileAddButtonClick} />
      </div>
    </SubWrapper>
  );
}

FileMenuSub.propTypes = {
  onFolderAddButtonClick: PropTypes.func.isRequired,
  onFileAddButtonClick: PropTypes.func.isRequired,
};

export default FileMenuSub;
