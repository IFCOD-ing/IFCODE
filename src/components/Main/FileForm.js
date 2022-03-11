import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const FileFormWrapper = styled.div`
  display: ${(props) => (props.isDisplay ? undefined : "none")};
  height: 150px;
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

function FileForm({ isShow, onSubmitFile, onCancel, errorMessage }) {
  return (
    <FileFormWrapper isDisplay={isShow}>
      <form className="input-form" onSubmit={onSubmitFile}>
        <input name="fileName" placeholder="input file or folder name" />
        <div>
          <button type="button" onClick={onCancel}>
            취소
          </button>
          <button type="submit">생성</button>
          <p>{errorMessage}</p>
        </div>
      </form>
    </FileFormWrapper>
  );
}

FileForm.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onSubmitFile: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default FileForm;
