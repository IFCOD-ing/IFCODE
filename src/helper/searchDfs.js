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

export { createStructureId, addFileById };
