import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import CloseButton from "../../common/CloseButton";

const TabWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  min-width: 120px;
  padding: 0 10px;
  border-right: 1px solid ${(props) => props.theme.mainColor};
  border-bottom: ${(props) => (props.isSelected ? "2px solid #0fd1c9" : "")};
  background-color: ${(props) =>
    props.isSelected ? props.theme.backgroundColor : ""};
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => (props.isSelected ? "#ffffff" : "#4d4d4d")};
  cursor: pointer;

  .title {
    display: inline-block;
  }
`;

function Tab({ id, title, onClick, tabState, onClose }) {
  const isSelected = id === tabState;

  return (
    <TabWrapper isSelected={isSelected}>
      <span className="title" onClick={onClick}>
        {title}
      </span>
      <CloseButton onClick={onClose} />
    </TabWrapper>
  );
}

Tab.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  tabState: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Tab;
