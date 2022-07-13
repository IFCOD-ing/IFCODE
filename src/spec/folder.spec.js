import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Folder from "../components/main/Tree/Folder";

jest.mock("react-icons/ai", () => ({
  AiOutlineFolder: function FolderIcon() {
    return <p>folder</p>;
  },
  AiOutlineFolderAdd: function FolderAddIcon({ onClick }) {
    return <p onClick={onClick}>folderAdd</p>;
  },
  AiOutlineFileAdd: function FileAddIcon({ onClick }) {
    return <p onClick={onClick}>fileAdd</p>;
  },
  AiOutlineDelete: function DeleteIcon({ onClick }) {
    return <p onClick={onClick}>delete</p>;
  },
  AiOutlineEdit: function EditIcon({ onClick }) {
    return <p onClick={() => onClick()}>edit</p>;
  },
}));

describe("Folder component test", () => {
  test("Folder component render test", () => {
    const mockOnClickFileAddButton = jest.fn();

    render(
      <Folder name="test" onClickFileAddButton={mockOnClickFileAddButton}>
        <p>folderChild</p>
      </Folder>
    );

    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("folderAdd")).toBeInTheDocument();
    expect(screen.getByText("fileAdd")).toBeInTheDocument();
    expect(screen.getByText("delete")).toBeInTheDocument();
    expect(screen.getByText("edit")).toBeInTheDocument();
    expect(screen.getByText("folderChild")).toBeInTheDocument();
  });

  test("Folder component folderAddIcon onClick method test", () => {
    const mockOnClickFileAddButton = jest.fn();
    const mockOnClickFoderAddButton = jest.fn();

    render(
      <Folder
        name="test"
        onClickFileAddButton={mockOnClickFileAddButton}
        onClickFolderAddButton={mockOnClickFoderAddButton}
      >
        <p>folderChild</p>
      </Folder>
    );

    userEvent.click(screen.getByText("folderAdd"), undefined, {
      skipPointerEventsCheck: true,
    });

    expect(mockOnClickFoderAddButton).toBeCalledTimes(1);
  });

  test("Folder component fileAddIcon onClick method test", () => {
    const mockOnClickFileAddButton = jest.fn();
    const mockOnClickFoderAddButton = jest.fn();

    render(
      <Folder
        name="test"
        onClickFileAddButton={mockOnClickFileAddButton}
        onClickFolderAddButton={mockOnClickFoderAddButton}
      >
        <p>folderChild</p>
      </Folder>
    );

    userEvent.click(screen.getByText("fileAdd"), undefined, {
      skipPointerEventsCheck: true,
    });

    expect(mockOnClickFileAddButton).toBeCalledTimes(1);
  });

  test("Folder component folderEditIcon onClick method test", () => {
    const mockOnClickFileAddButton = jest.fn();
    const mockOnClickFoderEditButton = jest.fn();

    render(
      <Folder
        name="test"
        onClickFileAddButton={mockOnClickFileAddButton}
        onClickFolderEditButton={mockOnClickFoderEditButton}
      >
        <p>folderChild</p>
      </Folder>
    );

    userEvent.click(screen.getByText("edit"), undefined, {
      skipPointerEventsCheck: true,
    });

    expect(mockOnClickFoderEditButton).toBeCalledTimes(1);
  });

  test("Folder component folderDeleteIcon onClick method test", () => {
    const mockOnClickFileAddButton = jest.fn();
    const mockOnClickFoderDeleteButton = jest.fn();

    render(
      <Folder
        name="test"
        onClickFileAddButton={mockOnClickFileAddButton}
        onClickFolderDeleteButton={mockOnClickFoderDeleteButton}
      >
        <p>folderChild</p>
      </Folder>
    );

    userEvent.click(screen.getByText("delete"), undefined, {
      skipPointerEventsCheck: true,
    });

    expect(mockOnClickFoderDeleteButton).toBeCalledTimes(1);
  });
});
