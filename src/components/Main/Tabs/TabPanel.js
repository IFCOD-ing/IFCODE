import React from "react";
import PropTypes from "prop-types";

function TabPanel({ children }) {
  return <>{children}</>;
}

TabPanel.propTypes = {
  children: PropTypes.node,
};

export default TabPanel;
