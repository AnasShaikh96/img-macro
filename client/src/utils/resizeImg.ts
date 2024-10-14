export const resizeImg = async (file: File) => {
  const fileReader = new FileReader();
  const image = new Image();
  const canvas = document.createElement("canvas");
  const maxSize = 2 * 1024;

  const resize = async () => {
    let width = image.width;
    let height = image.height;

    if (width > height) {
      if (width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
      }
    } else {
      if (height > maxSize) {
        width *= maxSize / height;
        height = maxSize;
      }
    }

    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")?.drawImage(image, 0, 0, width, height);
    const getBlob = await new Promise((reslve) =>
      canvas.toBlob((blob) => {
        if (blob) {
          const convertBlobToFile = new File([blob], file.name, {
            type: file.type,
          });

          reslve(convertBlobToFile);
        }
      }, file.type)
    );

    return getBlob;
  };

  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("Event Rejected in ResizeImf"));
    }

    fileReader.readAsDataURL(file);
    fileReader.onload = (readerEvent) => {
      if (typeof readerEvent.target?.result === "string") {
        image.src = readerEvent.target?.result;
        image.onload = () => resolve(resize());
      }
    };
  });
};
