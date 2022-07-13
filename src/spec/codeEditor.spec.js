import React from "react";
import { render, screen } from "@testing-library/react";

import CodeEditor from "../components/main/CodeEditor";

const mockFile = {
  name: "index.js",
  content: "test",
  id: "testId",
};

describe("CodeEditor component test", () => {
  test("CodeEditor component render test", () => {
    const mockOnContentChange = jest.fn();

    render(
      <CodeEditor file={mockFile} onContentChange={mockOnContentChange} />
    );

    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
