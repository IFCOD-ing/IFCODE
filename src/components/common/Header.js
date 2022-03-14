import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 7vh;
  border-bottom: 5px solid ${(props) => props.theme.mainColor};
  background-color: ${(props) => props.theme.backgroundColor};
  color: #ffffff;

  .title {
    margin-left: 20px;
    line-height: 60px;
    font-weight: bold;
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <div className="title">
        <h1>IF (CODE)</h1>
      </div>
    </HeaderWrapper>
  );
}

export default Header;
