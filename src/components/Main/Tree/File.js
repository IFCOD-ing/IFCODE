import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { AiOutlineFile, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { DiJavascript1, DiCss3Full, DiHtml5, DiReact } from "react-icons/di";

const FILE_ICONS = {
  js: <DiJavascript1 />,
  css: <DiCss3Full />,
  html: <DiHtml5 />,
  jsx: <DiReact />,
};

function File({
  name,
  id,
  onClick,
  onClickFileEditButton,
  onClickFileDeleteButton,
}) {
  const ext = name.split(".")[1];

  return (
    <FileWrapper>
      {FILE_ICONS[ext] || <AiOutlineFile />}
      <span className="file" onClick={() => onClick(id)}>
        {name}
      </span>
      <div className="actions">
        <AiOutlineEdit onClick={onClickFileEditButton} />
        <AiOutlineDelete onClick={onClickFileDeleteButton} />
      </div>
    </FileWrapper>
  );
}

const FileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;

  .file {
    margin-left: 5px;
    cursor: pointer;
  }

  .actions {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    opacity: 0;
    pointer-events: none;
    transition: 0.2s;

    svg {
      margin-left: 10px;
      transform: scale(1);
      transition: 0.2s;
      cursor: pointer;

      :hover {
        transform: scale(1.1);
      }
    }
  }

  &:hover .actions {
    opacity: 1;
    pointer-events: all;
    transition: 0.2s;
  }
`;

File.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickFileEditButton: PropTypes.func.isRequired,
  onClickFileDeleteButton: PropTypes.func,
};

export default File;
