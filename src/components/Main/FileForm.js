import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "../common/Button";

const FileFormWrapper = styled.div`
  display: ${(props) => (props.isDisplay ? undefined : "none")};
  height: 120px;
  border-top: 1px solid ${(props) => props.theme.mainColor};
  border-bottom: 1px solid ${(props) => props.theme.mainColor};

  .input-form {
    text-align: center;
    line-height: 40px;

    input {
      border-top: none;
      border-left: none;
      border-right: none;
      border-bottom: 2px solid #0fd1c9;
      background-color: ${(props) => props.theme.backgroundColor};
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

    p {
      font-size: 12px;
      color: red;
    }
  }
`;

function FileForm({
  isShow,
  onSubmitFile,
  onCancel,
  errorMessage,
  placeholderText,
}) {
  return (
    <FileFormWrapper isDisplay={isShow}>
      <form className="input-form" onSubmit={onSubmitFile}>
        <input name="fileName" placeholder={placeholderText} />
        <div>
          <Button type="button" text="취소" onClick={onCancel} />
          <Button type="submit" text="생성" />
        </div>
        <p>{errorMessage}</p>
      </form>
    </FileFormWrapper>
  );
}

FileForm.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onSubmitFile: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  placeholderText: PropTypes.string,
};

export default FileForm;
