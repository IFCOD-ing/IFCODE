import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledIframe = styled.iframe`
  background-color: #fff;
`;

function WebView({ document, run }) {
  const iframeRef = useRef();

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.location.reload();
    }
  }, [run]);

  return (
    <StyledIframe
      srcDoc={document}
      title="output"
      sandbox="allow-modals allow-forms allow-popups allow-same-origin allow-scripts"
      frameBorder="0"
      width="100%"
      height="100%"
      ref={iframeRef}
    />
  );
}

WebView.propTypes = {
  document: PropTypes.string,
  run: PropTypes.number,
};

export default WebView;
