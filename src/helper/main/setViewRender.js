import { transform } from "@babel/standalone";

import { findScriptTag, findLinkTag } from "./document/findTag";
import { findFileByPath } from "./document/findFileByPath";
import { removeScriptTag, removeLinkTag } from "./document/removeTag";

import { createGraph } from "./bundler";

const transpileOptionInfo = {
  javascript: {
    presets: [["es2015"]],
  },
  react: {
    presets: ["react", ["es2015"]],
  },
  redux: {
    presets: ["react", ["es2015"]],
  },
};

function transplie(fileContent, options) {
  try {
    return transform(fileContent, options).code;
  } catch (err) {
    return err;
  }
}

function setViewRender(fileTree, type, dependencyInfo) {
  const { templete, htmlPath, entryPointPath } = type;

  const htmlPathArray = htmlPath.split("/");
  const htmlFile = findFileByPath(fileTree, htmlPathArray);

  const { nonModulePathList, modulePathList } = findScriptTag(htmlFile);
  const styleLinkList = findLinkTag(htmlFile);

  let htmlCode = "";
  let scriptTagCode = "";
  let styleTagCode = "";

  htmlCode = removeScriptTag(
    htmlFile,
    nonModulePathList.concat(modulePathList)
  );
  htmlCode = removeLinkTag(htmlCode, styleLinkList);

  nonModulePathList.forEach((value) => {
    const path = value.split("/");
    const scriptCode = findFileByPath(fileTree, path);

    const scriptTag = `
      <script>
        ${transplie(scriptCode, {
          presets: [["es2015", { modules: false }]],
        })}
      </script>
    `;

    scriptTagCode = scriptTagCode.concat(scriptTag);
  });

  styleLinkList.forEach((value) => {
    const path = value.split("/");
    const styleCode = findFileByPath(fileTree, path);

    const styleTag = `
      <style>
        ${styleCode}
      </style>
    `;

    styleTagCode = styleTagCode.concat(styleTag);
  });

  const dependencyList = [];
  const totalModuleList = [];

  if (entryPointPath) {
    const { files, dependencies } = createGraph(
      fileTree,
      entryPointPath,
      dependencyInfo
    );

    const transpiledFiles = files.map(
      ({ fileName, content }) => `
        {
          fileName: "${fileName}",
          func: function (require, exports) {
            ${transplie(content, transpileOptionInfo[templete])}
          },
          exports: {}
        }
      `
    );

    totalModuleList.push(transpiledFiles);
    dependencyList.push(...dependencies);
  }

  modulePathList.forEach((value) => {
    const { files, dependencies } = createGraph(
      fileTree,
      value,
      dependencyInfo
    );

    const transpiledFiles = files.map(
      ({ fileName, content }) => `
        {
          fileName: "${fileName}",
          func: function (require, exports) {
            ${transplie(content, transpileOptionInfo[templete])}
          },
          exports: {}
        }
      `
    );

    totalModuleList.push(transpiledFiles);
    dependencyList.push(...dependencies);
  });

  let dependency = "";
  let dependencyValue = "";

  dependencyList.forEach((value) => {
    dependency += "\n" + value.content;
    dependencyValue += value.name + ",\n";
  });

  const info = `
    {
      ${dependencyValue}
    }
  `;

  const transpiledDependencise = dependencyList.map(
    ({ fileName, name }) => `
    {
      fileName: "${fileName}",
      name: "${name}",
    }
  `
  );

  const code = `
    const dependencies = [${transpiledDependencise.join(",")}];
    const modules = [${totalModuleList.join(",")}];

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

    modules.forEach((module) => {
      module?.func(require, module.exports);
    });
  `;

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

    window.onerror = function (message, source, lineno, colno, error) {
      console.log(message);
    }
  `;

  const doc = `
  <!DOCTYPE html>
  <html>
    <head>
      ${styleTagCode}
    </head>
    <body>
      <script>${logScript}</script>
      <script type="module">
        ${dependency}
        const info = ${info}
        ${code}
      </script>
      ${htmlCode}
      ${scriptTagCode}
    </body>
  <html>
    `;

  return doc;
}

export { setViewRender };
