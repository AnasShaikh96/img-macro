import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import imageCompression, { Options } from "browser-image-compression";

function App() {
  const [files, setFiles] = useState<File[]>([]);

  async function handleMultipleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.files) {
      const images = Array.from(event.target.files) ?? [];
      // await Promise.all(images.map((image: File) => imageCompressor(image)));

      // console.log(compressedImages);

      setFiles(images);
    }
  }

  // console.log(files);

  const imageCompressor = async (data: File) => {
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

  async function handleMultipleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = "http://localhost:3000/upload";
    const formData = new FormData();

    await Promise.all(files.map((image: File) => imageCompressor(image))).then(
      (res) => {
        res.forEach((file: File, index: number) => {
          const fle = new File([file], file.name, {
            lastModified: Date.now(),
            type: file.type,
          });

          // console.log(fle);
          formData.append(`file${index}`, fle);
        });
      }
    );

    // files.forEach((file: File, index: number) => {
    //   console.log(file);
    //   formData.append(`file${index}`, file);
    // });
    // await Promise.all(
    //   files.map(
    //     (image: File, index: number) => formData.append(`file${index}`, imageCompressor(image))
    //     // imageCompressor(image)
    //   )
    // );

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    await axios
      .post(url, formData, config)
      .then((response) => {
        console.log(response.data);
        // setUploadedFiles(response.data.files);
      })
      .catch((error) => {
        console.error("Error uploading files: ", error);
      });
  }

  const HandleClick = async () => {
    try {
      await axios
        .get("http://localhost:3000/download", {
          responseType: "blob",
        })
        .then(async (res) => {
          try {
            const blob = await res.data;

            const link = document.createElement("a");
            const url = window.URL.createObjectURL(blob);

            link.href = url;
            link.download = "MyDoc.docx";

            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
          } catch (error) {
            console.log(error);
          }
        });
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleMultipleSubmit}>
        <h1>React Multiple File Upload</h1>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleMultipleChange}
        />
        <button type="submit">Upload</button>
      </form>

      <button onClick={HandleClick} type="button">
        Dowload Files
      </button>
    </div>
  );
}

export default App;
