export function getFunctions(code: string, language: SupportedLanguage) {
  if (language === "Python") {
    const comments = code.match(pythonCommentsRegex) ?? [];
    const all = code.match(pythonRegex) ?? [];
    return elementwiseDifference(all, comments);
  }
  if (language === "JavaScript") {
    const comments = code.match(javascriptCommentsRegex) ?? [];
    const all = code.match(javascriptRegex) ?? [];
    return elementwiseDifference(all, comments);
  }
  return [] as string[];
}

const pythonRegex = /(?<=(\s*)def\s*)\w*(?=(\s*\(.*\):))/g;
const pythonCommentsRegex = /(?<=(\s*)#\s*def\s*)\w*(?=(\s*\(.*\):))/g;

const javascriptRegex =
  /(?<=(\s*)(export\s)?((default\s*)?function|const|let)\s*)\w*(?=\s*((\()|(=\s*(\(.*\)\s*=>))))/g;
const javascriptCommentsRegex =
  /(?<=(\s*)((\/\/|\/\*)\s*)(export\s)?((default\s*)?function|const|let)\s*)\w*(?=\s*((\()|(=\s*(\(.*\)\s*=>))))/g;

const elementwiseDifference = (all: string[], comments: string[]) => {
  let counter = 0;
  return all.filter((element) => {
    if (element === comments[counter]) {
      counter++;
      return false;
    }
    return true;
  });
};
