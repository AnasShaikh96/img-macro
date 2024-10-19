// import React, { useRef, useState } from "react";
import "./App.css";
// import axios from "axios";
// import { resizeImg } from "./components/utils/resizeImg";
import { CreateDoc } from "./components/features/doc-fomatter/component/create-doc";

function App() {
  // const inputFileRef = useRef<HTMLInputElement | null>(null);

  // const [files, setFiles] = useState<File[]>([]);

  // async function handleFileChanges(event: React.ChangeEvent<HTMLInputElement>) {
  //   if (event.target.files) {
  //     const images = Array.from(event.target.files) ?? [];
  //     setFiles(images);
  //   }
  // }

  // async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   const url = "http://localhost:3000/upload";
  //   const formData = new FormData();

  //   await Promise.all(
  //     files.map(async (image: File) => (await resizeImg(image)) as File)
  //   ).then((res: File[]) => {
  //     res.forEach((file: File, index: number) => {
  //       formData.append(`file${index}`, file);
  //     });
  //   });

  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //   };

  //   await axios
  //     .post(url, formData, config)
  //     .then(() => {
  //       setFiles([]);
  //       // setDisableDownloadBtn(false);

  //       const getInputFile = inputFileRef.current;
  //       if (getInputFile) {
  //         getInputFile.value = "";
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error uploading files: ", error);
  //     });
  // }

  // const HandleDownload = async () => {
  //   try {
  //     await axios
  //       .get("http://localhost:3000/download", {
  //         responseType: "blob",
  //       })
  //       .then(async (res) => {
  //         try {
  //           const blob = await res.data;

  //           const link = document.createElement("a");
  //           const url = window.URL.createObjectURL(blob);

  //           link.href = url;
  //           link.download = "MyDoc.docx";

  //           document.body.appendChild(link);
  //           link.click();

  //           window.URL.revokeObjectURL(url);
  //           document.body.removeChild(link);
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       });
  //   } catch (error) {
  //     console.error("Error downloading document:", error);
  //   }
  // };

  return (
    <div className="App">
      <CreateDoc />
    </div>
  );
}

export default App;
