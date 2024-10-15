import imageCompression, { Options } from "browser-image-compression";

export const imageCompressor = async (data: File) => {
  const options: Options = {
    maxSizeMB: 0.25,
    useWebWorker: true,
    // fileType: "image/png",
    // onProgress: (e) => console.log(e),
  };

  try {
    const compressImage = await imageCompression(data, options);
    return compressImage;
    // console.log(compressImage);
    // setFiles((prev) => [...prev, compressImage]);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

