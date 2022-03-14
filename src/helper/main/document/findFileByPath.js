import _ from "lodash";

function findFileByPath(fileTree, path) {
  const cloneFileTree = _.cloneDeep(fileTree);
  const clonePath = _.cloneDeep(path);

  const queue = cloneFileTree;

  while (queue.length) {
    const node = queue.shift();

    if (node.name === clonePath[0] && node.childrens) {
      clonePath.shift();
      queue.push(...node.childrens);
    }

    if (clonePath.length === 1 && node.name === clonePath[0]) {
      return node.content;
    }
  }
}

export { findFileByPath };
