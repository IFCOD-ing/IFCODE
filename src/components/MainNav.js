import React from "react";
import styled from "styled-components";

import Tree from "./Tree/Tree";

const NavWrapper = styled.div`
  min-width: 400px;
  height: 100%;
  background-color: #151515;
  border-right: 5px solid #343434;
  color: white;
`;

const structure = [
  {
    type: "folder",
    name: "src",
    childrens: [
      {
        type: "folder",
        name: "Components",
        childrens: [
          { type: "file", name: "Modal.js" },
          { type: "file", name: "Modal.css" },
        ],
      },
      { type: "file", name: "index.js" },
      { type: "file", name: "index.html" },
    ],
  },
  { type: "file", name: "package.json" },
];

function Nav() {
  return (
    <NavWrapper>
      <Tree data={structure} />
    </NavWrapper>
  );
}

export default Nav;
