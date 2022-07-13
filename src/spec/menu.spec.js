import React from "react";
import { render, screen } from "@testing-library/react";

import Menu from "../components/main/Menu";

describe("Menu component test", () => {
  test("Menu component render test", () => {
    render(
      <Menu title="testTitle" titleExtend="testExtend" titleSub="testSub">
        <p>testContent</p>
      </Menu>
    );

    expect(screen.getByText("testTitle")).toBeInTheDocument();
    expect(screen.getByText("testExtend")).toBeInTheDocument();
    expect(screen.getByText("testSub")).toBeInTheDocument();
    expect(screen.getByText("testContent")).toBeInTheDocument();
  });
});
