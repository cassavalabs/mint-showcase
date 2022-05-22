module.exports = {
  displayName: "uikits",
  preset: "../../jest.preset.ts",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/libs/uikits",
};
