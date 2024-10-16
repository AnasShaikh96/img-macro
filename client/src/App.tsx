import React, { useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import { resizeImg } from "./components/utils/resizeImg";

function App() {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  // const [disableUploadBtn, setDisableUploadBtn] = useState<boolean>(false);
  // const [disableDownloadBtn, setDisableDownloadBtn] = useState<boolean>(true);

  async function handleMultipleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.files) {
      const images = Array.from(event.target.files) ?? [];
      // setDisableUploadBtn(false);
      setFiles(images);
    }
  }

  async function handleMultipleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = "http://localhost:3000/upload";
    const formData = new FormData();

    await Promise.all(
      files.map(async (image: File) => (await resizeImg(image)) as File)
    ).then((res: File[]) => {
      res.forEach((file: File, index: number) => {
        formData.append(`file${index}`, file);
      });
    });

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    await axios
      .post(url, formData, config)
      .then(() => {
        setFiles([]);
        // setDisableDownloadBtn(false);

        const getInputFile = inputFileRef.current;
        if (getInputFile) {
          getInputFile.value = "";
        }
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
          ref={inputFileRef}
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
