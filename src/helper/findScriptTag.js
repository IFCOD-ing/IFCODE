import { Parser } from "htmlparser2";

function findScriptTag(html) {
  let currentSrc = "";
  const pathList = [];

  const parser = new Parser({
    onopentag(name, attributes) {
      if (name === "script") {
        currentSrc = "";
        currentSrc = attributes.src;
      }
    },
    onclosetag(tagname) {
      if (tagname === "script") {
        if (!currentSrc) {
          return;
        }

        if (
          currentSrc.startsWith("http://") &&
          currentSrc.startsWith("https://")
        ) {
          return;
        }
        pathList.push(currentSrc);
      }
    },
  });
  parser.write(html);
  parser.end();

  return pathList;
}

export { findScriptTag };
