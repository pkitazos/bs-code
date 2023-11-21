export function getFunctions(file: CodeFile) {
  const pythonRegex = /(?<=(\n[\s]*)def\s*)\w*(?=(\s*\(.*\):))/g;
  const javascriptRegex =
    /(?<=(\n[\s]*)(export\s)?((default\s*)?function|const|let)\s*)\w*(?=\s*((\()|(=\s*(\(.*\)\s*=>))))/g;
  let functions: string[] = [];
  if (file.language === "Python") {
    functions = file.code.match(pythonRegex) ?? [];
  } else if (file.language === "JavaScript") {
    console.log("here");
    functions = file.code.match(javascriptRegex) ?? [];
  }
  return functions;
}
