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

  // const start = html.indexOf("<script ");
  // const end = html.indexOf("</script>");
  // const scriptTag = html.slice(start, end);

  // const srcInfo = scriptTag.indexOf("src");
  // const path = scriptTag
  //   .slice(srcInfo)
  //   .split("=")[1]
  //   .replaceAll(">", "")
  //   .replaceAll("'", "")
  //   .replaceAll('"', "")
  //   .split("/");

  // console.log(path);
}

export { findScriptTag };
