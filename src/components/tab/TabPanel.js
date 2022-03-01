import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

const TabPanelWrapper = styled.div`
  display: ${(props) => (props.isSelected ? "" : "none")};
`;

function TabPanel({ index, toggleState, children }) {
  const isSelected = index === toggleState;

  return <TabPanelWrapper isSelected={isSelected}>{children}</TabPanelWrapper>;
}

TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  toggleState: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default TabPanel;
