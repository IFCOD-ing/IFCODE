import { nanoid } from "nanoid";
import _ from "lodash";

function createStructureId(fileStructure) {
  const cloneFileStructure = _.cloneDeep(fileStructure);

  function travelsalTree(data) {
    if (!data) {
      return;
    }

    for (let i = 0; i < data.length; i++) {
      data[i].id = nanoid();
      travelsalTree(data[i].childrens);
    }
  }

  travelsalTree(cloneFileStructure);

  return cloneFileStructure;
}

function addFileById(file, id, name) {
  function travelsalTree(data) {
    if (!data) {
      return;
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data[i].childrens.push({ type: "file", name, id: nanoid() });
        return;
      }

      travelsalTree(data[i].childrens);
    }
  }

  travelsalTree(file, id);
}

function addNewFileById(fileTree, folderId, name, type) {
  const cloneFileTree = _.cloneDeep(fileTree);
  let error = "";

  function travelsalTree(data) {
    if (!data) {
      return;
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === folderId) {
        if (type === "file") {
          data[i].childrens.push({ type, name, id: nanoid() });
        }

        if (type === "folder") {
          const folder = data[i].childrens.find(
            ({ name: fileName }) => fileName === name
          );

          if (folder) {
            error = "이미 존재하는 파일입니다.";
            return;
          }

          data[i].childrens.push({ type, name, id: nanoid(), childrens: [] });
        }

        return;
      }

      travelsalTree(data[i].childrens);
    }
  }

  travelsalTree(cloneFileTree, folderId);

  if (error) {
    return error;
  }

  return cloneFileTree;
}

function findFileById(fileStructure, id) {
  let file;

  function travelsalTree(data) {
    if (!data) {
      return;
    }

    for (let i = 0; i < data.length; i++) {
      if (!file && data[i].id === id) {
        file = data[i];
        return;
      }

      travelsalTree(data[i].childrens);
    }
  }

  travelsalTree(fileStructure);

  return file;
}

function updateFile(fileStructure, id, content) {
  function travelsalTree(data) {
    if (!data) {
      return;
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data[i].content = content;
        return;
      }

      travelsalTree(data[i].childrens, id, content);
    }
  }

  travelsalTree(fileStructure, id, content);
}

function updateFileContent(fileTree, id, content) {
  const cloneFileTree = _.cloneDeep(fileTree);

  function travelsalTree(data, id, content) {
    if (!data) {
      return;
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data[i].content = content;
        return;
      }

      travelsalTree(data[i].childrens, id, content);
    }
  }

  travelsalTree(cloneFileTree, id, content);

  return cloneFileTree;
}

function findRenderFile(fileStructure, name) {
  let file;

  function travelsalTree(data) {
    if (!data) {
      return;
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].name === name) {
        file = data[i].content;
        return;
      }

      travelsalTree(data[i].childrens, name);
    }
  }

  travelsalTree(fileStructure, name);

  return file;
}

export {
  createStructureId,
  addFileById,
  findFileById,
  updateFile,
  findRenderFile,
  addNewFileById,
  updateFileContent,
};
