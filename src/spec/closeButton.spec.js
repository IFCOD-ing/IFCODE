import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CloseButton from "../components/common/CloseButton";

describe("CloseButton Component test", () => {
  test("CloseButton Componnet render test", () => {
    const mockOnClick = jest.fn();

    render(<CloseButton onClick={mockOnClick} />);

    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  test("CloseButton Component onClick method test", () => {
    const mockOnClick = jest.fn();

    render(<CloseButton onClick={mockOnClick} />);

    userEvent.click(screen.getByText("Close"));

    expect(mockOnClick).toBeCalledTimes(1);
  });
});
