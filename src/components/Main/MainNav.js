import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

const NavWrapper = styled.div`
  min-width: 400px;
  height: 100%;
  background-color: #151515;
  border-right: 5px solid #343434;
  color: white;
`;

function MainNav({ children }) {
  return <NavWrapper>{children}</NavWrapper>;
}

MainNav.propTypes = {
  children: PropTypes.node,
};

export default MainNav;
