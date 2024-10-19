import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../ui/form";
import { fileSchema } from "../api/create-doc";

export const CreateDoc = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fileSchema),
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <Input
        multiple
        type="file"
        registration={register("file")}
        error={errors["file"]}
      />
      <input type="submit" />
    </form>
  );
};
