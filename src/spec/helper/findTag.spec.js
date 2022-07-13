import { findScriptTag, findLinkTag } from "../../helper/main/document/findTag";

describe("findScriptTag, findLinkTag function test", () => {
  test("Get script tag for html code", () => {
    const mockHtmlCode =
      "<!DOCTYPE html>\n<html>\n<head>\n <script type='module' src='src/home.js' /> <link rel='stylesheet' href='src/styles.css'>\n</head>\n<body>\n\n  <script src='src/index.js'></script>\n</body>\n</html>";

    const { nonModulePathList, modulePathList } = findScriptTag(mockHtmlCode);

    expect(nonModulePathList[0]).toBe("src/index.js");
    expect(modulePathList[0]).toBe("src/home.js");
  });

  test("Get empty pathList about src='http..' for html code", () => {
    const mockHtmlCode =
      "<!DOCTYPE html>\n<html>\n<head>\n <script src='http://test.com'></script> <script src='https://test.com'></script>  <link rel='stylesheet' href='src/styles.css'>\n</head>\n<body>\n\n </body>\n</html>";

    const { nonModulePathList, modulePathList } = findScriptTag(mockHtmlCode);

    expect(nonModulePathList.length).toBe(0);
    expect(modulePathList.length).toBe(0);
  });

  test("Get style link tag for html code", () => {
    const mockHtmlCode =
      "<!DOCTYPE html>\n<html>\n<head>\n <link rel='stylesheet' href='src/styles.css'>\n</head>\n<body>\n\n  <script src='src/index.js'></script>\n</body>\n</html>";

    const styleLinkPathList = findLinkTag(mockHtmlCode);

    expect(styleLinkPathList[0]).toBe("src/styles.css");
  });

  test("Get empty pathList for html code", () => {
    const mockHtmlCode =
      "<!DOCTYPE html>\n<html>\n<head>\n </head>\n<body>\n\n  <script src='src/index.js'></script>\n</body>\n</html>";

    const styleLinkPathList = findLinkTag(mockHtmlCode);

    expect(styleLinkPathList.length).toBe(0);
  });
});
