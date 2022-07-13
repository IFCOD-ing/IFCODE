import { Parser } from "htmlparser2";

function findScriptTag(html) {
  let currentSrc = "";
  let isModuleType = false;
  const nonModulePathList = [];
  const modulePathList = [];

  const parser = new Parser({
    onopentag(name, attributes) {
      if (name === "script") {
        isModuleType = false;
        currentSrc = "";
        currentSrc = attributes.src;

        if (attributes.type === "module") {
          isModuleType = true;
        }
      }
    },
    onclosetag(tagname) {
      if (tagname === "script") {
        if (!currentSrc) {
          return;
        }

        if (
          currentSrc.startsWith("http://") ||
          currentSrc.startsWith("https://")
        ) {
          return;
        }

        if (isModuleType) {
          modulePathList.push(currentSrc);
        } else {
          nonModulePathList.push(currentSrc);
        }
      }
    },
  });

  parser.write(html);
  parser.end();

  return { nonModulePathList, modulePathList };
}

function findLinkTag(html) {
  let currentSrc = "";
  const styleLinkPathList = [];

  const parser = new Parser({
    onopentag(name, attributes) {
      if (name === "link") {
        currentSrc = "";
        currentSrc = attributes.href;
      }
    },
    onclosetag(tagname) {
      if (tagname === "link") {
        styleLinkPathList.push(currentSrc);
      }
    },
  });
  parser.write(html);
  parser.end();

  return styleLinkPathList;
}

export { findScriptTag, findLinkTag };
