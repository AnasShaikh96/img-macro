import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../ui/form";
import { fileSchema } from "../api/create-doc";
import { Button } from "../../../ui/button/button";
import { useRef, useState } from "react";
import axios from "axios";
import { resizeImg } from "../../../utils/resizeImg";
import "./create-doc.css";
import { v4 as uuidv4 } from "uuid";

export const CreateDoc = () => {
  const uuid = uuidv4();
  const urlParams = new URLSearchParams(window.location.search);
  let sessionId = "";

  if (!urlParams.get("session")) {
    urlParams.set("session", uuid);
    window.location.search = urlParams.toString();
  }
  sessionId = urlParams.get("session")?.toString() ?? "";

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [isDownloadDisabled, setIsDownloadDisabled] = useState<boolean>(true);
  const [docName, setDocName] = useState("Document");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fileSchema),
  });

  async function HandleUpload(files: FieldValues) {
    const url = "http://localhost:3000/upload";
    const formData = new FormData();

    await Promise.all(
      Object.values(files).map(
        async (image: File) => (await resizeImg(image)) as File
      )
    ).then((res: File[]) => {
      formData.append("sessionId", sessionId);

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
        const getInputFile = inputFileRef.current;
        if (getInputFile) {
          getInputFile.value = "";
        }

        setIsDownloadDisabled(false);
      })
      .catch((error) => {
        console.error("Error uploading files: ", error);
      });
  }

  const HandleDownload = async () => {
    try {
      await axios
        .get("http://localhost:3000/download", {
          params: {
            session: sessionId,
          },
          responseType: "blob",
        })
        .then(async (res) => {
          try {
            const blob = await res.data;

            const link = document.createElement("a");
            const url = window.URL.createObjectURL(blob);

            link.href = url;
            link.download = `${docName}.docx`;

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
    <>
      <button
        className="session-btn"
        onClick={() => {
          urlParams.delete("session");
          window.location.search = "";
        }}
      >
        New Session
      </button>
      <div className="create-doc-wrapper">
        <form
          className="create-doc-form"
          onSubmit={handleSubmit((d) => HandleUpload(d.file))}
        >
          <Input
            type="text"
            defaultValue={docName}
            onChange={(e) => console.log("e", e)}
            registration={register("text", {
              onChange: (e) => setDocName(e.target.value),
            })}
            error={errors["text"]}
          />

          <div className="form-field-wrap">
            <Input
              ref={inputFileRef}
              multiple
              type="file"
              registration={register("file")}
              error={errors["file"]}
            />
            <Button type="submit" text="Upload" />
          </div>
        </form>
        <Button
          className="download-btn"
          text="Download"
          type="button"
          onClick={HandleDownload}
          disabled={isDownloadDisabled}
        />
      </div>
    </>
  );
};
