import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

const NavWrapper = styled.div`
  min-width: 200px;
  height: 100%;
  background-color: #151515;
  border-right: 5px solid #343434;
`;

function Nav({ children }) {
  return <NavWrapper>{children}</NavWrapper>;
}

export default Nav;

Nav.propTypes = {
  children: PropTypes.node,
};
