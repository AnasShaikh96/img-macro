import { Input } from "../../../ui/form";
import "../component/create-doc.css";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileSchema } from "../api/create-doc";
import { Button } from "../../../ui/button/button";
import { useRef, useState } from "react";
import axios from "axios";
import { resizeImg } from "../../../utils/resizeImg";
import { v4 as uuidv4 } from "uuid";
import { generateTableCells } from "../api/generateTableCells";

const CreateClientDoc = () => {
  const uuid = uuidv4();
  const urlParams = new URLSearchParams(window.location.search);
  let sessionId = "";

  if (!urlParams.get("session")) {
    urlParams.set("session", uuid);
    window.location.search = urlParams.toString();
  }
  sessionId = urlParams.get("session")?.toString() ?? "";

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  console.log("inputFileRef");

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
    console.log("files in there", generateTableCells(files));

    
  }

  return (
    <>
      {/* <button
        className="session-btn"
        onClick={() => {
          urlParams.delete("session");
          window.location.search = "";
        }}
      >
        New Session
      </button> */}
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
          // onClick={HandleDownload}
          disabled={isDownloadDisabled}
        />
      </div>
    </>
  );
};

export default CreateClientDoc;
