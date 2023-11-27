type SupportedLanguage = "unset" | "Python" | "JavaScript";

interface FunctionRecording {
  name: string;
  audioURL: string;
}

interface CodeFile {
  fileName: string;
  code: string;
  language: SupportedLanguage;
  functions: FunctionRecording[];
}
