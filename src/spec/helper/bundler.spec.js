import { createGraph } from "../../helper/main/bundler";

const mockFileTree = [
  {
    type: "folder",
    name: "public",
    childrens: [
      {
        type: "file",
        name: "index.html",
        content:
          "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset='utf-8'>\n  <meta name='viewport' content='width=device-width'>\n  <title>IF(CODE)</title>\n </head>\n<body>\n  <div id='root'></div>\n</body>\n</html>",
      },
    ],
  },
  {
    type: "folder",
    name: "src",
    childrens: [
      {
        type: "file",
        name: "App.js",
        content:
          "import React from 'react';\n\nfunction App() {\n  return (\n    <div>\n      <h1>Hello IF(CODE)</h1>\n      <h2>Start editing to see some magic happen!</h2>\n    </div>\n  );\n}\n\nexport default App;\n",
      },
      {
        type: "file",
        name: "index.js",
        content:
          "import React, { StrictMode } from 'react';\nimport ReactDOM from 'react-dom';\n\nimport App from 'src/App.js';\n\nconst rootElement = document.getElementById('root');\nReactDOM.render(\n  <StrictMode>\n    <App />\n  </StrictMode>,\n  rootElement\n);\n",
      },
      { type: "file", name: "styles.css", content: "" },
    ],
  },
];

describe("bundler test", () => {
  test("Get fileInfo and dependencyList test", () => {
    const mockEntryFilePath = "src/index.js";
    const mockDependencyInfo = {
      react: "https://cdn.skypack.dev/react",
      "react-dom": "https://cdn.skypack.dev/react-dom",
      "styled-components": "https://cdn.skypack.dev/styled-components",
    };

    const { files, dependencies } = createGraph(
      mockFileTree,
      mockEntryFilePath,
      mockDependencyInfo
    );

    expect(files[0].content).toBe(mockFileTree[1].childrens[1].content);
    expect(files[1].content).toBe(mockFileTree[1].childrens[0].content);

    dependencies.forEach((value) => {
      expect(
        value.content.indexOf(mockDependencyInfo[value.fileName])
      ).not.toBe(-1);
    });
  });
});
