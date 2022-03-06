import { findFileByPath } from "./searchBfs";
import { findScriptTag } from "./findScriptTag";
import { findStyleTag } from "./findStyleTag";

function setViewRender(fileTree, html) {
  const pathList = findScriptTag(html);
  const hrefList = findStyleTag(html);
  const scriptList = [];
  const styleList = [];

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

  console.log(script);

  styleList.forEach((value) => {
    const currentStyle = "\n" + value;
    style = style.concat(currentStyle);
  });

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
          <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
          <meta http-equiv="Pragma" content="no-cache">
          <meta http-equiv="Expires" content="0">
        </head>
        <style>${style}</style>
        <body>
          ${html}
        <body>
        <script type="text/javascript">${logScript} ${script}</script>
      <html>
    `;

  return doc;
}

export { setViewRender };
