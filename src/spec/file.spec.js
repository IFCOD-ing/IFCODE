import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import File from "../components/main/Tree/File";

jest.mock("react-icons/ai", () => ({
  AiOutlineFile: function FileIcon() {
    return <p>file</p>;
  },
  AiOutlineEdit: function EditIcon({ onClick }) {
    return <p onClick={onClick}>edit</p>;
  },
  AiOutlineDelete: function DeleteIcon({ onClick }) {
    return <p onClick={() => onClick()}>delete</p>;
  },
}));

jest.mock("react-icons/di", () => ({
  DiJavascript1: function JavascriptIcon() {
    return <p>javascript</p>;
  },
  DiCss3Full: function CsstIcon() {
    return <p>css</p>;
  },
  DiHtml5: function HtmlIcon() {
    return <p>html</p>;
  },
  DiReact: function ReactIcon() {
    return <p>react</p>;
  },
}));

describe("File Component test", () => {
  test("File Component render test", () => {
    const mockOnClick = jest.fn();
    const mockOnClickFileEditButton = jest.fn();

    render(
      <File
        name="test"
        id="testId"
        onClick={mockOnClick}
        onClickFileEditButton={mockOnClickFileEditButton}
      />
    );

    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("file")).toBeInTheDocument();
    expect(screen.getByText("edit")).toBeInTheDocument();
    expect(screen.getByText("delete")).toBeInTheDocument();
  });

  test("File Component about javascript file extention render test", () => {
    const mockOnClick = jest.fn();
    const mockOnClickFileEditButton = jest.fn();

    render(
      <File
        name="test.js"
        id="testId"
        onClick={mockOnClick}
        onClickFileEditButton={mockOnClickFileEditButton}
      />
    );

    expect(screen.getByText("javascript")).toBeInTheDocument();
  });

  test("File Component about css file extention render test", () => {
    const mockOnClick = jest.fn();
    const mockOnClickFileEditButton = jest.fn();

    render(
      <File
        name="test.css"
        id="testId"
        onClick={mockOnClick}
        onClickFileEditButton={mockOnClickFileEditButton}
      />
    );

    expect(screen.getByText("css")).toBeInTheDocument();
  });

  test("File Component about html file extention render test", () => {
    const mockOnClick = jest.fn();
    const mockOnClickFileEditButton = jest.fn();

    render(
      <File
        name="test.html"
        id="testId"
        onClick={mockOnClick}
        onClickFileEditButton={mockOnClickFileEditButton}
      />
    );

    expect(screen.getByText("html")).toBeInTheDocument();
  });

  test("File Component about react file extention render test", () => {
    const mockOnClick = jest.fn();
    const mockOnClickFileEditButton = jest.fn();

    render(
      <File
        name="test.jsx"
        id="testId"
        onClick={mockOnClick}
        onClickFileEditButton={mockOnClickFileEditButton}
      />
    );

    expect(screen.getByText("react")).toBeInTheDocument();
  });

  test("File Component about fileIcon onClick method test", () => {
    const mockOnClick = jest.fn((id) => id);
    const mockOnClickFileEditButton = jest.fn();
    const mockOnClickFileDeleteButton = jest.fn();

    render(
      <File
        name="test"
        id="testId"
        onClick={mockOnClick}
        onClickFileEditButton={mockOnClickFileEditButton}
        onClickFileDeleteButton={mockOnClickFileDeleteButton}
      />
    );

    userEvent.click(screen.getByText("test"));

    expect(mockOnClick).toBeCalledTimes(1);
    expect(mockOnClick.mock.results[0].value).toBe("testId");
  });

  test("File Component about editIcon onClick method test", () => {
    const mockOnClick = jest.fn();
    const mockOnClickFileEditButton = jest.fn();
    const mockOnClickFileDeleteButton = jest.fn();

    render(
      <File
        name="test"
        id="testId"
        onClick={mockOnClick}
        onClickFileEditButton={mockOnClickFileEditButton}
        onClickFileDeleteButton={mockOnClickFileDeleteButton}
      />
    );

    userEvent.click(screen.getByText("edit"), undefined, {
      skipPointerEventsCheck: true,
    });

    expect(mockOnClickFileEditButton).toBeCalledTimes(1);
  });

  test("File Component about deleteIcon onClick method test", () => {
    const mockOnClick = jest.fn();
    const mockOnClickFileEditButton = jest.fn();
    const mockOnClickFileDeleteButton = jest.fn();

    render(
      <File
        name="test"
        id="testId"
        onClick={mockOnClick}
        onClickFileEditButton={mockOnClickFileEditButton}
        onClickFileDeleteButton={mockOnClickFileDeleteButton}
      />
    );

    userEvent.click(screen.getByText("delete"), undefined, {
      skipPointerEventsCheck: true,
    });

    expect(mockOnClickFileDeleteButton).toBeCalledTimes(1);
  });
});
