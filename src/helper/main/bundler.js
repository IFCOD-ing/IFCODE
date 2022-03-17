import { transform } from "@babel/standalone";
import { customAlphabet } from "nanoid";
import { findFileByPath } from "./fileTreeHelper";

function createGraph(fileTree, entryFilePath, dependencyInfo) {
  const files = [];
  const dependencies = [];
  const queue = [];

  queue.push(entryFilePath);

  while (queue.length > 0) {
    const currentFile = queue.shift();
    const dependcy = dependencies.find(
      ({ fileName }) => fileName === currentFile
    );

    if (dependcy) {
      continue;
    }

    if (dependencyInfo[currentFile]) {
      const nanoid = customAlphabet(
        "1234567890abcdefghijklmopqrsxyzABCDEFGHIJKLMOPQRXYZ_$",
        10
      );

      const name = "_" + nanoid();

      dependencies.push({
        fileName: currentFile,
        name,
        content: `import * as ${name} from "${dependencyInfo[currentFile]}";`,
      });

      continue;
    }

    const path = currentFile.split("/");
    const content = findFileByPath(fileTree, path);

    files.push({
      fileName: currentFile,
      content,
    });

    try {
      transform(content, {
        presets: ["react"],
        plugins: [checkImport],
      });
    } catch (err) {
      console.log(err);
    }
  }

  function checkImport() {
    return {
      visitor: {
        ImportDeclaration(path) {
          queue.push(path.node.source.value);
        },
      },
    };
  }

  return { files, dependencies };
}

export { createGraph };
