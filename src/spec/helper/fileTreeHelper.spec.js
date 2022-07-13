import {
  createNodeId,
  addNewFileById,
  editFileOrFolderName,
  delteFileOrFolderName,
  getAllFiles,
  findFileById,
  findFileByPath,
  updateFileContent,
} from "../../helper/main/fileTreeHelper";

const mockFileStructure = [
  {
    type: "folder",
    id: "1",
    name: "public",
    childrens: [
      {
        type: "file",
        id: "3NanoId",
        name: "index.html",
        content:
          "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset='utf-8'>\n  <meta name='viewport' content='width=device-width'>\n  <title>IF(CODE)</title>\n </head>\n<body>\n  <div id='root'></div>\n</body>\n</html>",
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
        id: "4NanoId",
        name: "App.js",
        content:
          "import React from 'react';\n\nfunction App() {\n  return (\n    <div>\n      <h1>Hello IF(CODE)</h1>\n      <h2>Start editing to see some magic happen!</h2>\n    </div>\n  );\n}\n\nexport default App;\n",
      },
      {
        type: "file",
        id: "5NanoId",
        name: "index.js",
        content:
          "import React, { StrictMode } from 'react';\nimport ReactDOM from 'react-dom';\n\nimport App from 'src/App.js';\n\nconst rootElement = document.getElementById('root');\nReactDOM.render(\n  <StrictMode>\n    <App />\n  </StrictMode>,\n  rootElement\n);\n",
      },
      { type: "file", id: "6NanoId", name: "styles.css", content: "" },
    ],
  },
];

describe("fileTreeHelper test", () => {
  test("createNodeId function test", () => {
    const result = createNodeId(mockFileStructure);

    result.forEach((value) => {
      expect(value.id).toBeTruthy();
    });
  });

  test("addNewFileById function with folderId for 'root' test", () => {
    const addedFolderResult = addNewFileById(
      mockFileStructure,
      "root",
      "test",
      "folder"
    );
    const addedFileResult = addNewFileById(
      mockFileStructure,
      "root",
      "test.js",
      "file"
    );

    expect(addedFolderResult[addedFolderResult.length - 1].name).toBe("test");
    expect(addedFileResult[addedFileResult.length - 1].name).toBe("test.js");
  });

  test("addNewFileById function with folderId test", () => {
    const addedFolderResult = addNewFileById(
      mockFileStructure,
      "2",
      "test",
      "folder"
    );
    const addedFileResult = addNewFileById(
      mockFileStructure,
      "2",
      "test.js",
      "file"
    );

    expect(
      addedFolderResult[1].childrens[addedFolderResult[1].childrens.length - 1]
        .name
    ).toBe("test");
    expect(
      addedFileResult[1].childrens[addedFileResult[1].childrens.length - 1].name
    ).toBe("test.js");
  });

  test("addNewFileById function with error message test", () => {
    const alreadyExistedFolder = addNewFileById(
      mockFileStructure,
      "root",
      "public",
      "folder"
    );
    const alreadyExistedFile = addNewFileById(
      mockFileStructure,
      "2",
      "App.js",
      "file"
    );

    expect(alreadyExistedFolder).toBe("이미 존재하는 폴더입니다.");
    expect(alreadyExistedFile).toBe("이미 존재하는 파일입니다.");
  });

  test("editFileOrFolderName function with unique id test", () => {
    const editedFolderResult = editFileOrFolderName(
      mockFileStructure,
      "2",
      "test"
    );

    expect(editedFolderResult[1].name).toBe("test");
  });

  test("editFileOrFolderName function with error message test", () => {
    const editedFolderResult = editFileOrFolderName(
      mockFileStructure,
      "2",
      "public"
    );

    expect(editedFolderResult).toBe("이미 존재하는 이름입니다.");
  });

  test("delteFileOrFolderName function with unique id test", () => {
    const { updatedFileTree, removedFolder } = delteFileOrFolderName(
      mockFileStructure,
      "2"
    );

    expect(updatedFileTree.length).toBe(1);
    expect(removedFolder[0].name).toBe("src");
  });

  test("getAllFiles function test", () => {
    const fileIdList = getAllFiles(mockFileStructure);

    expect(fileIdList.includes("3NanoId")).toBeTruthy();
    expect(fileIdList.includes("4NanoId")).toBeTruthy();
    expect(fileIdList.includes("5NanoId")).toBeTruthy();
    expect(fileIdList.includes("6NanoId")).toBeTruthy();
  });

  test("findFileById function test", () => {
    const fileInfo = findFileById(mockFileStructure, "3NanoId");

    expect(fileInfo.id).toBe("3NanoId");
  });

  test("updateFileContent function test", () => {
    const updatedFileStructure = updateFileContent(
      mockFileStructure,
      "3NanoId",
      "test"
    );

    expect(updatedFileStructure[0].childrens[0].content).toBe("test");
  });
});
