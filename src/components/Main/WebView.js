import React from "react";
import PropTypes from "prop-types";

function WebView({ document }) {
  return (
    <iframe
      srcDoc={document}
      title="output"
      sandbox="allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts"
      frameBorder="0"
      width="100%"
      height="100%"
    />
  );
}

WebView.propTypes = {
  document: PropTypes.string,
};

export default WebView;
