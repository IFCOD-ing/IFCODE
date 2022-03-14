function removeScriptTag(htmlFile, pathList) {
  let htmlCode = htmlFile;

  pathList.forEach((value) => {
    htmlCode.indexOf(value);
    const scriptOpenTagIndex = htmlCode.lastIndexOf("<script", value);
    const scriptCloseTagIndex = htmlCode.indexOf("</", scriptOpenTagIndex);
    const scriptTagLastIndex = htmlCode.indexOf(">", scriptCloseTagIndex);

    htmlCode = htmlCode.replace(
      htmlCode.slice(scriptOpenTagIndex, scriptTagLastIndex + 1),
      ""
    );
  });

  return htmlCode;
}

function removeLinkTag(htmlFile, pathList) {
  let htmlCode = htmlFile;

  pathList.forEach((value) => {
    htmlCode.indexOf(value);
    const linkOpenTagIndex = htmlCode.lastIndexOf("<link", value);
    const linkCloseTagIndex = htmlCode.indexOf(">", linkOpenTagIndex);

    htmlCode = htmlCode.replace(
      htmlCode.slice(linkOpenTagIndex, linkCloseTagIndex + 1),
      ""
    );
  });

  return htmlCode;
}

export { removeScriptTag, removeLinkTag };
