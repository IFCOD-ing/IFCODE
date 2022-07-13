import React from "react";
import { render, screen } from "@testing-library/react";

import MainPane from "../components/main/MainPane";

describe("MainPane component test", () => {
  test("MainPane component render test", () => {
    render(
      <MainPane>
        <p>test</p>
      </MainPane>
    );

    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
