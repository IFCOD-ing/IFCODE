import { Parser } from "htmlparser2";

function findStyleTag(html) {
  let currentSrc = "";
  const pathList = [];

  const parser = new Parser({
    onopentag(name, attributes) {
      if (name === "link") {
        currentSrc = "";
        currentSrc = attributes.href;
      }
    },
    onclosetag(tagname) {
      if (tagname === "link") {
        pathList.push(currentSrc);
      }
    },
  });
  parser.write(html);
  parser.end();

  return pathList;
}

export { findStyleTag };
