import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "../components/common/Button";

describe("Button Component test", () => {
  test("Button Componnet render test", () => {
    const mockOnClick = jest.fn();

    render(<Button type="button" text="testButton" onClick={mockOnClick} />);

    expect(screen.getByText("testButton")).toBeInTheDocument();
  });

  test("Button Component onClick method test", () => {
    const mockOnClick = jest.fn();

    render(<Button type="button" text="testButton" onClick={mockOnClick} />);

    userEvent.click(screen.getByText("testButton"));

    expect(mockOnClick).toBeCalledTimes(1);
  });
});
