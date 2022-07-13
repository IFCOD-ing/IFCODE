import React from "react";
import { render, screen } from "@testing-library/react";

import Tree from "../components/main/Tree/Tree";

const mockData = [
  {
    type: "folder",
    id: "1",
    name: "public",
    childrens: [
      {
        type: "file",
        id: "6",
        name: "index.html",
        content: "index.html code",
      },
    ],
  },
  {
    type: "folder",
    id: "2",
    name: "src",
    childrens: [
      {
        type: "file",
        id: "3",
        name: "App.js",
        content: "App.js code",
      },
      {
        type: "file",
        id: "4",
        name: "index.js",
        content: "index.js code",
      },
      { type: "file", id: "5", name: "styles.css", content: "" },
    ],
  },
];

describe("Tree component test", () => {
  test("Tree component render test", () => {
    render(<Tree data={mockData} />);

    expect(screen.getByText("public")).toBeInTheDocument();
    expect(screen.getByText("src")).toBeInTheDocument();
    expect(screen.getByText("index.html")).toBeInTheDocument();
    expect(screen.getByText("App.js")).toBeInTheDocument();
    expect(screen.getByText("index.js")).toBeInTheDocument();
    expect(screen.getByText("styles.css")).toBeInTheDocument();
  });
});
