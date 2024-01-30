export const objectToFormData = (obj, form?, namespace?) => {
  const fd = form || new FormData();
  let formKey;
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (namespace) {
        formKey = `${namespace}.${property}`;
      } else {
        formKey = property;
      }

      // if the property is an object, but not a File,
      // use recursivity.
      if (Array.isArray(obj[property])) {
        obj[property].forEach((e) => {
          fd.append(property, e);
        });
      } else if (
        typeof obj[property] === "object" &&
        !(obj[property] instanceof File)
      ) {
        objectToFormData(obj[property], fd, property);
      } else {
        // if it's a string or a File object
        fd.append(formKey, obj[property]);
      }
    }
  }

  return fd;
};

export const getFileName = (file: string | File): string => {
  let fileName: string =
    typeof file === "string" ? file.split("/").at(-1) || "" : file.name;

  if (fileName.length > 25) {
    fileName = fileName.split("/").at(-1)?.slice(0, 25) + "...";
  }

  return fileName;
};
