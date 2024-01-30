export const openFile = (filePath: string | File) => {
  if (typeof filePath === "string") {
    window.open(filePath);
  } else {
  }
};
