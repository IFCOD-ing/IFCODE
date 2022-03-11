import { transform } from "@babel/standalone";

import { findFileByPath } from "./searchBfs";
import { findScriptTag } from "./findScriptTag";
import { findStyleTag } from "./findStyleTag";

import { createGraph } from "./bundler";

// import styledComponents from 'https://cdn.skypack.dev/styled-components';

const dependenciesInfo = {
  react: "https://cdn.skypack.dev/react",
  "react-dom": "https://cdn.skypack.dev/react-dom",
  "canvas-confetti": "https://cdn.skypack.dev/canvas-confetti",
  "styled-components": "https://cdn.skypack.dev/styled-components",
};

function setViewRender(fileTree, html, index) {
  const pathList = findScriptTag(html);
  const hrefList = findStyleTag(html);
  const scriptList = [];
  const styleList = [];

  const OPTIONS = {
    presets: ["react", ["es2015"]],
  };

  function transplie(fileContent) {
    try {
      const { code } = transform(fileContent, OPTIONS);

      return code;
    } catch (err) {
      console.log(err);
    }
  }

  const { files, dependencies } = createGraph(
    fileTree,
    "src/index.js",
    dependenciesInfo
  );

  const transpiledFiles = files.map(
    ({ fileName, content }) => `
    {
      fileName: "${fileName}",
      func: function (require, exports) {
        ${transplie(content)}
      },
      exports: {}
    }
  `
  );

  let dependency = "";
  let dependencyValue = "";

  dependencies.forEach((value) => {
    dependency += "\n" + value.content;
    dependencyValue += value.name + ",\n";
  });

  const info = `
    {
      ${dependencyValue}
    }
  `;

  const transpiledDependencise = dependencies.map(
    ({ fileName, name }) => `
    {
      fileName: "${fileName}",
      name: "${name}",
    }
  `
  );

  const code = `
    const modules = [${transpiledFiles.join(",")}];
    const dependencies = [${transpiledDependencise.join(",")}];

    const require = function(file) {
      const dependency = dependencies.find(({ fileName }) => fileName === file);

      if (dependency) {
        if (info[dependency.name].default) {
          return info[dependency.name].default
        } else {
          return info[dependency.name]
        }
      }

      const module = modules.find(({ fileName }) => fileName === file);

      if (!module) {
        throw new Error('Can not find "' + file + '" file.');
      }

      module?.func(require, module.exports);
      return module.exports;
    };

    modules[0]?.func(require, modules[0].exports);
  `;

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

  const logScript = `
    const logMessage = function (message) {
      window.parent.postMessage({ source: "iframe", log: message }, '*');
    }

    function add(something) {
      if (!something.toString) {
        logMessage("[Object object]");
      } else {
        logMessage(something.toString());
      }
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
        <script type="module">
          ${dependency}
          const info = ${info}
          ${logScript}
          ${code}
        </script>
      <html>
    `;

  return doc;
}

// function customPlugin({ types: t }) {
//   return {
//     visitor: {
//       ImportDeclaration(path) {
//         const dependency = path.node.source.value;

//         if (dependenciesInfo[dependency]) {
//           path.node.source.value = dependenciesInfo[dependency];
//         }
//       },
//     },
//   };
// }

{
  /* <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
          <meta http-equiv="Pragma" content="no-cache">
          <meta http-equiv="Expires" content="0"></meta> */
}

export { setViewRender };
