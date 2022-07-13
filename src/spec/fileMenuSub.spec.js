import React from "react";
import { render, screen } from "@testing-library/react";

import FileMenuSub from "../components/main/FileMenuSub";
import userEvent from "@testing-library/user-event";

jest.mock("react-icons/ai", () => ({
  AiOutlineFolderAdd: function FolderAddIcon({ onClick }) {
    return <p onClick={onClick}>folderAdd</p>;
  },
  AiOutlineFileAdd: function FileAdd({ onClick }) {
    return <p onClick={onClick}>fileAdd</p>;
  },
}));

describe("FileMenuSub component test", () => {
  test("FileMenuSub render test", () => {
    const mockOnFolderAddButtonClick = jest.fn();
    const mockOnFileAddButtonClick = jest.fn();

    render(
      <FileMenuSub
        onFolderAddButtonClick={mockOnFolderAddButtonClick}
        onFileAddButtonClick={mockOnFileAddButtonClick}
      />
    );

    expect(screen.getByText("folderAdd")).toBeInTheDocument();
    expect(screen.getByText("fileAdd")).toBeInTheDocument();
  });

  test("FileMenuSub onFolderAddButtonClick method test", () => {
    const mockOnFolderAddButtonClick = jest.fn();
    const mockOnFileAddButtonClick = jest.fn();

    render(
      <FileMenuSub
        onFolderAddButtonClick={mockOnFolderAddButtonClick}
        onFileAddButtonClick={mockOnFileAddButtonClick}
      />
    );

    userEvent.click(screen.getByText("folderAdd"), undefined, {
      skipPointerEventsCheck: true,
    });

    expect(mockOnFolderAddButtonClick).toBeCalledTimes(1);
  });

  test("FileMenuSub onFileAddButtonClick method test", () => {
    const mockOnFolderAddButtonClick = jest.fn();
    const mockOnFileAddButtonClick = jest.fn();

    render(
      <FileMenuSub
        onFolderAddButtonClick={mockOnFolderAddButtonClick}
        onFileAddButtonClick={mockOnFileAddButtonClick}
      />
    );

    userEvent.click(screen.getByText("fileAdd"), undefined, {
      skipPointerEventsCheck: true,
    });

    expect(mockOnFileAddButtonClick).toBeCalledTimes(1);
  });
});
