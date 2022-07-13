import React from "react";
import { render, screen } from "@testing-library/react";

import Log from "../components/main/Terminal/Log";

describe("Log Component test", () => {
  test("Log Componnet render test", () => {
    render(<Log content="test" />);

    expect(screen.getByText(/test/)).toBeInTheDocument();
  });
});
