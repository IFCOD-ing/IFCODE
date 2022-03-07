import { transform } from "@babel/standalone";
// import test from "@babel/plugin-transform-modules-commonjs";

import { findFileByPath } from "./searchBfs";
import { findScriptTag } from "./findScriptTag";
import { findStyleTag } from "./findStyleTag";

const dependenciesInfo = {
  react: "https://cdn.skypack.dev/react",
  "react-dom": "https://cdn.skypack.dev/react-dom",
  "canvas-confetti": "https://cdn.skypack.dev/canvas-confetti",
};

function setViewRender(fileTree, html, index) {
  const pathList = findScriptTag(html);
  const hrefList = findStyleTag(html);
  const scriptList = [];
  const styleList = [];

  const OPTIONS = {
    presets: ["react", ["es2015", { modules: false }]],
    plugins: [customPlugin],
  };

  pathList.forEach((value) => {
    const path = value.split("/");

    const script = findFileByPath(fileTree, path);
    scriptList.push(script);
  });

  hrefList.forEach((value) => {
    const path = value.split("/");

    const style = findFileByPath(fileTree, path);
    styleList.push(style);
  });

  let script = "";
  let style = "";

  scriptList.forEach((value) => {
    const currentScript = "\n" + value;
    script = script.concat(currentScript);
  });

  styleList.forEach((value) => {
    const currentStyle = "\n" + value;
    style = style.concat(currentStyle);
  });

  script = "\n" + index;

  try {
    script = transform(script, OPTIONS).code;
  } catch (err) {
    console.log(err);
  }

  console.log(script);

  const logScript = `
      const logMessage = function (message) {
        window.parent.postMessage({ source: "iframe", log: message }, '*');
      }

      function add(something) {
        logMessage(something.toString());
      };

      const originalError = console.error;
      const originalLog = console.log;
      const originalWarning = console.warn;
      const originalInfo = console.info;
      const originalClear = console.clear;

      console.error = function (error) {
        add(error.toString() + error.stack);
        originalError.apply(console, arguments);
      };
      console.log = function (...args) {
        args.forEach(add);
        originalLog.apply(console, args);
      };
      console.warn = function (...args) {
        args.forEach(add);
        originalWarning.apply(console, args);
      };
      console.info = function (...args) {
        args.forEach(add);
        originalInfo.apply(console, args);
      };
      console.clear = function (...args) {
        element.innerHTML = '';
        originalClear.apply(console, args);
      };
    `;

  const doc = `
    <!DOCTYPE html>
      <html>
        <head>
          
        </head>
        <style>${style}</style>
        <body>
          ${html}
        <body>
        <script></script>
        <script type="module">${logScript} ${script}</script>
      <html>
    `;

  return doc;
}

function customPlugin({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path) {
        const dependency = path.node.source.value;

        if (dependenciesInfo[dependency]) {
          path.node.source.value = dependenciesInfo[dependency];
        }
      },
    },
  };
}

{
  /* <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
          <meta http-equiv="Pragma" content="no-cache">
          <meta http-equiv="Expires" content="0"></meta> */
}

export { setViewRender };
