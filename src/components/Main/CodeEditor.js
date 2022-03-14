import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";

const Wrapper = styled.div`
  .cm-editor {
    background-color: #151515;
  }

  .cm-gutters {
    background-color: #151515;
  }

  .cm-scroller::-webkit-scrollbar {
    height: 1px;
  }
`;

function CodeEditor({ file, onContentChange }) {
  const { name, content, id } = file;
  const fileType = name.split(".")[1];

  const extenstionInfo = {
    js: javascript({ jsx: true }),
    html: html(),
    css: css(),
  };

  return (
    <Wrapper>
      <CodeMirror
        className="code-editor"
        value={content}
        width="100%"
        height="100%"
        extensions={fileType && [extenstionInfo[fileType]]}
        onChange={(value) => onContentChange(value, id)}
        theme="dark"
      />
    </Wrapper>
  );
}

CodeEditor.propTypes = {
  file: PropTypes.object.isRequired,
  onContentChange: PropTypes.func.isRequired,
};

export default CodeEditor;
