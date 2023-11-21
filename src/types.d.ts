type SupportedLanguage = "unset" | "Python" | "JavaScript";

interface FunctionRecording {
  name: string;
  mediaRecordingPath: string;
}

interface CodeFile {
  fileName: string;
  code: string;
  language: SupportedLanguage;
  functions: FunctionRecording[];
}
