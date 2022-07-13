import React from "react";
import { render, screen } from "@testing-library/react";

import PaneContainer from "../components/main/SplitPane/PaneContainer";

describe("PaneContainer Component test", () => {
  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  test("PaneContainer Component about vertical type render test", () => {
    render(
      <PaneContainer viewType="vertical">
        <div>
          <p>onePart</p>
        </div>
        <div>
          <p>twoPart</p>
        </div>
      </PaneContainer>
    );

    expect(screen.getByText("onePart")).toBeInTheDocument();
    expect(screen.getByText("twoPart")).toBeInTheDocument();
  });

  test("PaneContainer Component about horizontal type render test", () => {
    render(
      <PaneContainer viewType="horizontal">
        <div>
          <p>onePart</p>
        </div>
        <div>
          <p>twoPart</p>
        </div>
      </PaneContainer>
    );

    expect(screen.getByText("onePart")).toBeInTheDocument();
    expect(screen.getByText("twoPart")).toBeInTheDocument();
  });
});
