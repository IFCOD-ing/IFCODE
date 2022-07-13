import React from "react";
import { render, screen } from "@testing-library/react";

import Header from "../components/common/Header";

describe("Header Component test", () => {
  test("Header Componnet render test", () => {
    render(<Header />);

    expect(screen.getByText("IF (CODE)")).toBeInTheDocument();
  });
});
