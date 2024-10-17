import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const createDocSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  age: z.number().min(10, { message: "Number Required" }),
});

export type CreateDocSchema = z.infer<typeof createDocSchema>;

export const CreateDoc = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createDocSchema),
  });
 
  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <input {...register("name")} />
      {errors.name?.message && <p>{String(errors.name?.message)}</p>}
      <input type="number" {...register("age", { valueAsNumber: true })} />
      {errors.age?.message && <p>{String(errors.age?.message)}</p>}
      <input type="submit" />
    </form>
  );
};
