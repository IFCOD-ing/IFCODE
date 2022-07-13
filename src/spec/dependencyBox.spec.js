import React from "react";
import { render, screen } from "@testing-library/react";

import DependencyBox from "../components/main/DependencyBox";

describe("DependencyBox component test", () => {
  test("DependencyBox component render test", () => {
    render(
      <DependencyBox title="testTitle">
        <p>testContent</p>
      </DependencyBox>
    );

    expect(screen.getByText("testTitle")).toBeInTheDocument();
    expect(screen.getByText("testContent")).toBeInTheDocument();
  });
});
