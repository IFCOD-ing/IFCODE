import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const MenuWrapper = styled.div`
  width: 100%;
  min-height: 200px;
  border-bottom: 1px solid #343434;

  .title-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #343434;
    height: 40px;
    line-height: 40px;
    margin-left: 20px;
    font-size: 20px;
    margin-right: 20px;

    .title {
      display: flex;
      align-items: center;
    }

    .title-extend {
      margin-left: 10px;
    }

    .run-button {
      height: 20px;
      width: 40px;
    }
  }
`;

function Menu({ title, titleExtend, titleSub, children }) {
  return (
    <MenuWrapper>
      <div className="title-box">
        <div className="title">
          <p>{title}</p>
          <div className="title-extend">{titleExtend}</div>
        </div>
        <div>{titleSub}</div>
      </div>
      {children}
    </MenuWrapper>
  );
}

Menu.propTypes = {
  title: PropTypes.string.isRequired,
  titleExtend: PropTypes.node,
  titleSub: PropTypes.node,
  children: PropTypes.node,
};

export default Menu;
