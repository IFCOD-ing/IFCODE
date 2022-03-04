import React, { useState } from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

import {
  AiOutlineFolder,
  AiOutlineFolderAdd,
  AiOutlineFileAdd,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";

const FolderWrapper = styled.div`
  padding-left: 20px;

  .folder--label {
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
  }
`;

const Collapsible = styled.div`
  height: ${(props) => (props.isOpen ? "auto" : "0")};
  overflow: hidden;
`;

function Folder({ name, children, onClickFileAddButton }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <FolderWrapper>
      <div className="folder--label">
        <div onClick={handleToggle}>
          <AiOutlineFolder />
          <span>{name}</span>
        </div>
        <div className="actions">
          <AiOutlineEdit />
          <AiOutlineFileAdd onClick={onClickFileAddButton} />
          <AiOutlineFolderAdd />
          <AiOutlineDelete />
        </div>
      </div>
      <Collapsible isOpen={isOpen}>{children}</Collapsible>
    </FolderWrapper>
  );
}

Folder.propTypes = {
  // id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClickFileAddButton: PropTypes.func.isRequired,
};

export default Folder;
