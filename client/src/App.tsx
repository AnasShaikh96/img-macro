import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [files, setFiles] = useState<File[]>([]);

  // const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  function handleMultipleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const images = Array.from(event.target.files);
      setFiles(images);
    }
  }

  function handleMultipleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = "http://localhost:3000/upload";
    const formData = new FormData();

    files.forEach((file: string | Blob, index: number) => {
      formData.append(`file${index}`, file);
    });

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
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
    // await axios
    //   .get("http://localhost:3000/download", {
    //     headers: {
    //       "Content-Type": "application/octet-stream",
    //     },
    //   })
    //   .then((res) => {
    //     // const data = Uint8Array.from(res.data);
    //     // const content = new Blob([data], {
    //     //   type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //     // });

    //     // const encodedUri = window.URL.createObjectURL(content);
    //     // const link = document.createElement("a");

    //     // link.setAttribute("href", encodedUri);
    //     // link.setAttribute("download", "MyDocument.docx");

    //     // link.click();
    //   })
    //   .catch((err) => console.log(err));

    try {
      // Fetch the document as a Blob directly
      const response = await fetch("http://localhost:3000/download", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to download document");
      }

      // Get the Blob from the response
      const blob = await response.blob();

      // Create a download link for the Blob
      const link = document.createElement("a");
      const url = window.URL.createObjectURL(blob);

      link.href = url;
      link.download = "MyDocument.docx"; // Set the desired file name

      // Trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
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

      {/* {uploadedFiles && uploadedFiles.map((file, index) => (
        <img key={index} src={file} alt={`Uploaded content ${index}`} />
      ))} */}
    </div>
  );
}

export default App;
