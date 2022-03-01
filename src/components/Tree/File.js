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

const FileWrapper = styled.div`
  padding-left: 20px;
  display: flex;
  align-items: center;

  span {
    margin-left: 5px;
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
      cursor: pointer;
      margin-left: 10px;
      transform: scale(1);
      transition: 0.2s;

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

function File({ name }) {
  let ext = name.split(".")[1];

  return (
    <FileWrapper>
      {FILE_ICONS[ext] || <AiOutlineFile />}
      <span>{name}</span>

      <div className="actions">
        <AiOutlineEdit />
        <AiOutlineDelete />
      </div>
    </FileWrapper>
  );
}

File.propTypes = {
  name: PropTypes.string,
};

export default File;
