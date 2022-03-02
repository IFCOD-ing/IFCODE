import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import PropTypes from "prop-types";
import styled from "styled-components";

import { cancelUpdateFile, addFile } from "../features/file/fileSlice";

const FileFormWrapper = styled.div`
  display: ${(props) => (props.view ? undefined : "none")};
  height: 100px;
  margin-top: 10px;
  border-top: 1px solid #343434;
  border-bottom: 1px solid #343434;

  .input-form {
    text-align: center;
    line-height: 40px;

    input {
      border-top: none;
      border-left: none;
      border-right: none;
      border-bottom: 2px solid #0fd1c9;
      background-color: #151515;
      color: #fff;
    }

    button {
      margin: 5px;
      border: 0;
      outline: 0;
      background-color: #343434;
      color: #fff;
    }

    button:hover {
      background-color: #0fd1c9;
    }
  }
`;

function FileForm({ display }) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleCancelButton() {
    dispatch(cancelUpdateFile());
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const fileName = event.target.fileName.value;

    dispatch(addFile({ name: fileName }));
    event.target.fileName.value = "";
  }

  return (
    <FileFormWrapper view={display}>
      <form className="input-form" onSubmit={handleFormSubmit}>
        <input
          name="fileName"
          ref={inputRef}
          placeholder="input file or folder name"
        />
        <div>
          <button type="button" onClick={handleCancelButton}>
            취소
          </button>
          <button type="submit">생성</button>
        </div>
      </form>
    </FileFormWrapper>
  );
}

FileForm.propTypes = {
  display: PropTypes.string.isRequired,
};

export default FileForm;
