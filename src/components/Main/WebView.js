import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function WebView({ document, run }) {
  const iframeRef = useRef();

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.location.reload();
    }
  }, [run]);

  return (
    <iframe
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
