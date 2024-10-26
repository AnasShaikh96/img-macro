import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../ui/form";
import { fileSchema } from "../api/create-doc";
import { Button } from "../../../ui/button/button";
import { useRef, useState } from "react";
import axios from "axios";
import { resizeImg } from "../../../utils/resizeImg";

export const CreateDoc = () => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [isDownloadDisabled, setIsDownloadDisabled] = useState<boolean>(true);
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
    <>
      <form onSubmit={handleSubmit((d) => HandleUpload(d.file))}>
        <Input
          ref={inputFileRef}
          multiple
          type="file"
          registration={register("file")}
          error={errors["file"]}
        />
        <Button type="submit" text="Upload" />
      </form>
      <Button
        text="Download"
        type="button"
        onClick={HandleDownload}
        disabled={isDownloadDisabled}
      />
    </>
  );
};
