import React, { useState } from "react";
import "./App.css";
import axios from "axios";

 
function App() {
  const [files, setFiles] = useState<File[]>([]);

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
      console.log(file);

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
      {/* {uploadedFiles.map((file, index) => (
        <img key={index} src={file} alt={`Uploaded content ${index}`} />
      ))} */}
    </div>
  );
}

export default App;
