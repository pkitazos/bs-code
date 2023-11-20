type FunctionRecording = {
  name: string;
  mediaRecordingPath: string;
};

export const data: FunctionRecording[] = [
  { name: "func1", mediaRecordingPath: "some/path" },
  { name: "func2", mediaRecordingPath: "" },
];

const filteredData = data.filter((item) => item.mediaRecordingPath !== "");
