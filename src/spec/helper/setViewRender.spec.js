import { setViewRender } from "../../helper/main/setViewRender";

const mockFileTree = [
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

const reactViewOption = {
  templete: "react",
  htmlPath: "public/index.html",
  entryPointPath: "src/index.js",
};

const reactDependencyInfo = {
  react: "https://cdn.skypack.dev/react",
  "react-dom": "https://cdn.skypack.dev/react-dom",
  "styled-components": "https://cdn.skypack.dev/styled-components",
};

describe("setViewRender test", () => {
  test("Get document with setViewRender function test", () => {
    const doc = setViewRender(
      mockFileTree,
      reactViewOption,
      reactDependencyInfo
    );

    expect(doc.includes("<!DOCTYPE html>")).toBeTruthy();
    expect(doc.includes("<meta charset='utf-8'>")).toBeTruthy();
  });
});
