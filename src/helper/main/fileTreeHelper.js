import { nanoid } from "nanoid";
import _ from "lodash";

function createNodeId(fileStructure) {
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

function addNewFileById(fileTree, folderId, name, type) {
  const cloneFileTree = _.cloneDeep(fileTree);
  let error = "";

  if (folderId === "root") {
    if (type === "folder") {
      const folder = fileTree.find(({ name: fileName }) => fileName === name);

      if (folder) {
        error = "이미 존재하는 폴더입니다.";
        return error;
      }

      cloneFileTree.push({ type, name, id: nanoid(), childrens: [] });
    }

    if (type === "file") {
      const file = fileTree.find(({ name: fileName }) => fileName === name);

      if (file) {
        error = "이미 존재하는 파일입니다.";
        return error;
      }

      cloneFileTree.push({ type, name, id: nanoid() });
    }

    return cloneFileTree;
  }

  function travelsalTree(data) {
    if (!data) {
      return;
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === folderId) {
        if (type === "file") {
          const file = data[i].childrens.find(
            ({ name: fileName }) => fileName === name
          );

          if (file) {
            error = "이미 존재하는 파일입니다.";
            return;
          }

          data[i].childrens.push({ type, name, id: nanoid() });
        }

        if (type === "folder") {
          const folder = data[i].childrens.find(
            ({ name: fileName }) => fileName === name
          );

          if (folder) {
            error = "이미 존재하는 폴더입니다.";
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

function editFileOrFolderName(fileTree, id, editedName) {
  const cloneFileTree = _.cloneDeep(fileTree);
  let error = "";

  function travelsalTree(data, id, editedName) {
    if (!data) {
      return;
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        const sameFileOrFolder = data.find(({ name }) => name === editedName);

        if (sameFileOrFolder) {
          error = "이미 존재하는 이름입니다.";
          return;
        }

        data[i].name = editedName;

        return;
      }

      travelsalTree(data[i].childrens, id, editedName);
    }
  }

  travelsalTree(cloneFileTree, id, editedName);

  if (error) {
    return error;
  }

  return cloneFileTree;
}

function delteFileOrFolderName(fileTree, id) {
  const cloneFileTree = _.cloneDeep(fileTree);
  let removedFolder;

  function travelsalTree(data, id) {
    if (!data) {
      return;
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        removedFolder = data.splice(i, 1);
        return;
      }

      travelsalTree(data[i].childrens, id);
    }
  }

  travelsalTree(cloneFileTree, id);

  return { updatedFileTree: cloneFileTree, removedFolder };
}

function getAllFiles(fileTree) {
  const childrenIdList = [];

  function travelsalTree(data) {
    if (!data) {
      return;
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].type === "file") {
        childrenIdList.push(data[i].id);
      }

      travelsalTree(data[i].childrens);
    }
  }

  travelsalTree(fileTree);

  return childrenIdList;
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

function findFileByPath(fileTree, path) {
  const cloneFileTree = _.cloneDeep(fileTree);
  const clonePath = _.cloneDeep(path);

  const queue = cloneFileTree;

  let result = "file is not find";

  while (queue.length) {
    const node = queue.shift();

    if (node.name === clonePath[0] && node.childrens) {
      clonePath.shift();
      queue.push(...node.childrens);
    }

    if (clonePath.length === 1 && node.name === clonePath[0]) {
      result = node.content;
    }
  }

  return result;
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

export {
  createNodeId,
  addNewFileById,
  editFileOrFolderName,
  delteFileOrFolderName,
  getAllFiles,
  findFileById,
  findFileByPath,
  updateFileContent,
};
