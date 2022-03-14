// function validationInputText(text, type) {
//   if (type === "folder") {
//     for (let i = 0; i < text.length; i++) {
//       if (text.charCodeAt(i) === 32) {
//         return "공백이 포함되어 있습니다";
//       }

//       if (
//         (text.charCodeAt(i) >= 33 && text.charCodeAt(i) <= 47) ||
//         (text.charCodeAt(i) >= 58 && text.charCodeAt(i) <= 64) ||
//         (text.charCodeAt(i) >= 91 && text.charCodeAt(i) <= 96) ||
//         (text.charCodeAt(i) >= 123 && text.charCodeAt(i) <= 126)
//       ) {
//         return "특수문자가 포함되어 있습니다";
//       }
//     }
//   }
// }

function validationInputText(text, type) {
  if (type === "folder") {
    for (let i = 0; i < text.length; i++) {
      if (text.charCodeAt(i) === 32) {
        return "공백이 포함되어 있습니다";
      }

      if (
        (text.charCodeAt(i) >= 33 && text.charCodeAt(i) <= 47) ||
        (text.charCodeAt(i) >= 58 && text.charCodeAt(i) <= 64) ||
        (text.charCodeAt(i) >= 91 && text.charCodeAt(i) <= 96) ||
        (text.charCodeAt(i) >= 123 && text.charCodeAt(i) <= 126)
      ) {
        return "특수문자가 포함되어 있습니다";
      }
    }
  }
}

export { validationInputText };
