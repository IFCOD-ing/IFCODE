import React from "react";
import { render, screen } from "@testing-library/react";

import FileForm from "../components/main/FileForm";
import userEvent from "@testing-library/user-event";

describe("FileForm component test", () => {
  test("FileForm component render test", () => {
    const mockOnSubmitFile = jest.fn();
    const mockOnCancel = jest.fn();

    render(
      <FileForm
        isShow={true}
        onSubmitFile={mockOnSubmitFile}
        onCancel={mockOnCancel}
        errorMessage="testError"
        placeholderText="testPlaceholder"
      />
    );

    expect(screen.getByText("취소")).toBeInTheDocument();
    expect(screen.getByText("생성")).toBeInTheDocument();
    expect(screen.getByText("testError")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("testPlaceholder")).toBeInTheDocument();
  });

  test("FileForm component submit method test", () => {
    const mockOnSubmitFile = jest.fn((e) => e.preventDefault());
    const mockOnCancel = jest.fn();

    render(
      <FileForm
        isShow={true}
        onSubmitFile={mockOnSubmitFile}
        onCancel={mockOnCancel}
        errorMessage="testError"
        placeholderText="testPlaceholder"
      />
    );

    userEvent.click(screen.getByText("생성"));

    expect(mockOnSubmitFile).toBeCalledTimes(1);
  });

  test("FileForm component onCancel method test", () => {
    const mockOnSubmitFile = jest.fn((e) => e.preventDefault());
    const mockOnCancel = jest.fn();

    render(
      <FileForm
        isShow={true}
        onSubmitFile={mockOnSubmitFile}
        onCancel={mockOnCancel}
        errorMessage="testError"
        placeholderText="testPlaceholder"
      />
    );

    userEvent.click(screen.getByText("취소"));

    expect(mockOnCancel).toBeCalledTimes(1);
  });
});
