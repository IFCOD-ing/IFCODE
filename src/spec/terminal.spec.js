import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Terminal from "../components/main/Terminal/Terminal";

describe("Terminal Component test", () => {
  test("Terminal Component render test", () => {
    const mockOnClick = jest.fn();

    render(
      <Terminal title="testTitle" onExtraButtonClick={mockOnClick}>
        <p>content</p>
      </Terminal>
    );

    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText(/content/)).toBeInTheDocument();
  });

  test("Terminal Component onClick method test", () => {
    const mockOnClick = jest.fn();

    render(
      <Terminal title="testTitle" onExtraButtonClick={mockOnClick}>
        <p>content</p>
      </Terminal>
    );

    userEvent.click(screen.getByText("clear"));

    expect(mockOnClick).toBeCalledTimes(1);
  });
});
