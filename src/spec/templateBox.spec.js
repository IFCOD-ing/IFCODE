import React from "react";
import { render, screen } from "@testing-library/react";

import TempleteBox from "../components/main/TempleteBox";

describe("TempleteBox component test", () => {
  test("TempleteBox component render test", () => {
    render(
      <TempleteBox>
        <p>test</p>
      </TempleteBox>
    );

    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
