import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import "react-reflex/styles.css";

const PaneContainerBox = styled.div`
  width: 100%;
  height: 100%;

  .splitter {
    border: 2px solid #343434 !important;
  }

  .reflex-element::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  .reflex-element::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #343434;
  }
  .reflex-element::-webkit-scrollbar-track {
    background: #151515;
  }
`;

function PaneContainer({ children, viewType }) {
  return (
    <PaneContainerBox>
      <ReflexContainer orientation={viewType}>
        <ReflexElement>{children[0]}</ReflexElement>
        <ReflexSplitter className="splitter" />
        <ReflexElement>{children[1]}</ReflexElement>
      </ReflexContainer>
    </PaneContainerBox>
  );
}

PaneContainer.propTypes = {
  children: PropTypes.node.isRequired,
  viewType: PropTypes.string.isRequired,
};

export default PaneContainer;
