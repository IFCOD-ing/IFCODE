import { validationInputText } from "../../helper/main/validate";

describe("validate test", () => {
  test("validationInputText function test", () => {
    const includedSpecialCharacter = validationInputText("!!a", "folder");
    const includedBlank = validationInputText("a  a", "folder");
    const notFolder = validationInputText("aa", "file");

    expect(includedSpecialCharacter).toBe("특수문자가 포함되어 있습니다");
    expect(includedBlank).toBe("공백이 포함되어 있습니다");
    expect(notFolder).toBe(undefined);
  });
});
