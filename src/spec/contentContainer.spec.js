import React from "react";
import { render, screen } from "@testing-library/react";

import ContentContainer from "../components/main/ContentContainer";

describe("ContentContainer component test", () => {
  test("ContentContainer component render test", () => {
    render(
      <ContentContainer>
        <p>test</p>
      </ContentContainer>
    );

    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
