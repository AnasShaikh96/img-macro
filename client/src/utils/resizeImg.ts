export const resizeImg = (file: File) => {
  const fileReader = new FileReader();
  const image = new Image();

  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("Event Rejected in ResizeImf"));
    }

    fileReader.readAsDataURL(file);
    fileReader.onload = (readerEvent) => {
      if (typeof readerEvent.target?.result === "string") {
        image.src = readerEvent.target?.result;
        image.onload = () => resolve(console.log(image.src));
      }
    };
  });
};
