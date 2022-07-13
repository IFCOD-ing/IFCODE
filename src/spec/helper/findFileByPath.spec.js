import { findFileByPath } from "../../helper/main/document/findFileByPath";

const mockFileTree = [
  {
    type: "folder",
    name: "src",
    childrens: [
      {
        type: "file",
        name: "App.js",
        content: "App.js test code",
      },
      {
        type: "file",
        name: "index.js",
        content: "index.js test code",
      },
      { type: "file", name: "styles.css", content: "styles.css test code" },
    ],
  },
];

describe("findFileByPath function test", () => {
  test("Get specific path file based on fileTree", () => {
    const indexJsFileCode = findFileByPath(mockFileTree, ["src", "index.js"]);

    expect(indexJsFileCode).toBe("index.js test code");
  });

  test("Returns undefined for a path that does not exist", () => {
    const indexJsFileCode = findFileByPath(mockFileTree, ["index.js"]);

    expect(indexJsFileCode).toBe(undefined);
  });
});
