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
    await axios
      .get("http://localhost:3000/download", {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      })
      .then((res) => {
        const data = Uint8Array.from(res.data);
        const content = new Blob([data], { type: "base64" });

        const encodedUri = window.URL.createObjectURL(content);
        const link = document.createElement("a");

        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "MyDocument.docx");

        link.click();
      })
      .catch((err) => console.log(err));
  };

  const downloadDocx = async () => {
    try {
      // Fetch the file from the server
      const response = await fetch("/your-api-endpoint", {
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download document");
      }

      // Get the response as a Blob (binary data)
      const blob = await response.blob();

      // Create a link element
      const link = document.createElement("a");

      // Create a URL for the blob and set it as the href of the link
      const url = window.URL.createObjectURL(blob);
      link.href = url;

      // Set the download attribute with the desired file name
      link.download = "MyDocument.docx";

      // Append the link to the body
      document.body.appendChild(link);

      // Programmatically click the link to trigger the download
      link.click();

      // Cleanup: Remove the link and revoke the URL
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the document:", error);
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

      <button onClick={downloadDocx} type="button">
        Dowload Files
      </button>

      {/* {uploadedFiles && uploadedFiles.map((file, index) => (
        <img key={index} src={file} alt={`Uploaded content ${index}`} />
      ))} */}
    </div>
  );
}

export default App;
