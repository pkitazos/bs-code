interface FunctionRecording {
  name: string;
  mediaRecordingPath: string;
}

interface CodeFile {
  fileName: string;
  code: string;
  language: "unset" | "Python" | "JavaScript";
  functions: FunctionRecording[];
}
