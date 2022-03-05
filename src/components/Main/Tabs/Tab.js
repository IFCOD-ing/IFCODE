import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

import CloseButton from "../../common/CloseButton";

const TabWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  min-width: 120px;
  padding: 0 10px;
  border-right: 1px solid #343434;
  border-bottom: ${(props) => (props.isSelected ? "2px solid #0fd1c9" : "")};
  background-color: ${(props) => (props.isSelected ? "#151515" : "")};
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

function Tab({ id, title, onClick, tabState }) {
  const isSelected = id === tabState;

  return (
    <TabWrapper isSelected={isSelected} onClick={onClick}>
      <span className="title">{title}</span>
      <CloseButton />
    </TabWrapper>
  );
}

Tab.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  tabState: PropTypes.string.isRequired,
};

export default Tab;
