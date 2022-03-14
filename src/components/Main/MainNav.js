import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const NavWrapper = styled.div`
  min-width: 300px;
  height: 93vh;
  background-color: #151515;
  border-right: 5px solid #343434;
  color: white;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #343434;
  }
  &::-webkit-scrollbar-track {
    background: #151515;
  }
`;

function MainNav({ children }) {
  return <NavWrapper>{children}</NavWrapper>;
}

MainNav.propTypes = {
  children: PropTypes.node,
};

export default MainNav;
