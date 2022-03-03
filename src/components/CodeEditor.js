import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";

// javascript({ jsx: true })

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

function CodeEditor({ language, value }) {
  const extenstionInfo = {
    javascript,
    html,
    css,
  };

  return (
    <Wrapper>
      <CodeMirror
        className="code-editor"
        value={value}
        height="100%"
        extensions={[extenstionInfo[language]()]}
        onChange={(value, viewUpdate) => {
          console.log("value:", value);
        }}
        theme="dark"
      />
    </Wrapper>
  );
}

CodeEditor.propTypes = {
  language: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default CodeEditor;
