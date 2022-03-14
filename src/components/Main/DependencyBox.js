import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const DependencyWrapper = styled.div`
  .content-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .content-box:hover {
    background-color: #343434;
  }

  .title {
    padding: 10px;
  }
`;

function DependencyBox({ title, children }) {
  return (
    <DependencyWrapper>
      <div className="content-box">
        <p className="title">{title}</p>
        {children}
      </div>
    </DependencyWrapper>
  );
}

DependencyBox.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default DependencyBox;
