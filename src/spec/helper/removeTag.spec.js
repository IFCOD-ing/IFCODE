import {
  removeScriptTag,
  removeLinkTag,
} from "../../helper/main/document/removeTag";

describe("removeTag test", () => {
  test("removeScriptTag function test", () => {
    const mockHtmlCode =
      "<!DOCTYPE html>\n<html>\n<head>\n <script type='module' src='src/home.js' /> <link rel='stylesheet' href='src/styles.css'>\n</head>\n<body>\n\n  <script src='src/index.js'></script>\n</body>\n</html>";

    const result = removeScriptTag(mockHtmlCode, [
      "src/home.js",
      "src/index.js",
    ]);

    expect(result.indexOf("script")).toBe(-1);
  });

  test("removeLinkTag function test", () => {
    const mockHtmlCode =
      "<!DOCTYPE html>\n<html>\n<head>\n <script type='module' src='src/home.js' /> <link rel='stylesheet' href='src/styles.css'>\n</head>\n<body>\n\n  <script src='src/index.js'></script>\n</body>\n</html>";

    const result = removeLinkTag(mockHtmlCode, ["src/styles.css"]);

    expect(result.indexOf("link")).toBe(-1);
  });
});
