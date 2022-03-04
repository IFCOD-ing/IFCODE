import { nanoid } from "nanoid";
import _ from "lodash";

function createStructureId(fileStructure) {
  const cloneFileStructure = _.cloneDeep(fileStructure);

  function travelsalTree(data) {
    if (!data) {
      return;
    }

    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
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

function addNewFileById(fileTree, folderId, name) {
  const cloneFileTree = _.cloneDeep(fileTree);

  function travelsalTree(data) {
    if (!data) {
      return;
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === folderId) {
        data[i].childrens.push({ type: "file", name, id: nanoid() });
        return;
      }

      travelsalTree(data[i].childrens);
    }
  }

  travelsalTree(cloneFileTree, folderId);

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
