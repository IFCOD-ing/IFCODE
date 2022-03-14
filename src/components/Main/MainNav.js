import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const NavWrapper = styled.div`
  overflow-y: auto;
  min-width: 300px;
  height: 93vh;
  border-right: 5px solid ${(props) => props.theme.mainColor};
  background-color: ${(props) => props.theme.backgroundColor};
  color: white;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${(props) => props.theme.mainColor};
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.backgroundColor};
  }
`;

function MainNav({ children }) {
  return <NavWrapper>{children}</NavWrapper>;
}

MainNav.propTypes = {
  children: PropTypes.node,
};

export default MainNav;
