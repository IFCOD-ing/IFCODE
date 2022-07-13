import React from "react";
import { render, screen } from "@testing-library/react";

import MainNav from "../components/main/MainNav";

describe("MainNav component test", () => {
  test("MainNav component render test", () => {
    render(
      <MainNav>
        <p>test</p>
      </MainNav>
    );

    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
