// const dataURItoBlob = (dataURI: string) => {
//   const bytes =
//     dataURI.split(",")[0].indexOf("base64") >= 0
//       ? atob(dataURI.split(",")[1])
//       : unescape(dataURI.split(",")[1]);
//   const mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
//   const max = bytes.length;
//   const ia = new Uint8Array(max);
//   for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
//   return new Blob([ia], { type: mime });
// };

export const resizeImg = async (file: File) => {
  const fileReader = new FileReader();
  const image = new Image();
  const canvas = document.createElement("canvas");
  const maxSize = 5 * 1024 * 1024;

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
    // const dataURI = canvas.toDataURL(file.type);
    const getBlob = await new Promise((reslve) =>
      canvas.toBlob(reslve, file.type)
    );

    return getBlob;

    // canvas.toBlob((blob) => {
    //   console.log(blob);
    //   if (blob) {
    //     const canvastOfile = new File([blob], file.name, {
    //       type: file.type,
    //     });
    //     return canvastOfile;
    //   }
    // }, file.type);
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
