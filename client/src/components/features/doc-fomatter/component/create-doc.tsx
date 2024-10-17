// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Input } from "../../../ui/form";

// const createDocSchema = z.object({
//   name: z.string().min(1, { message: "sadasd" }),
//   age: z.number().min(10, { message: "sad" }),
// });

// export const CreateDoc = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(createDocSchema),
//   });

//   console.log(errors);

//   return (
//     <form onSubmit={handleSubmit((d) => console.log(d))}>
//       {/* <Input error={errors.name?.message?.toString()} /> */}
//       {/* <input {...register("name")} /> */}
//       {/* {errors.name?.message && <p>{errors.name?.message ?? ""}</p>} */}
//       <input type="number" {...register("age", { valueAsNumber: true })} />
//       {errors.age?.message && <p>{String(errors.age?.message)}</p>}
//       {/* <Input type="number" error={errors} /> */}

//       <input type="submit" />
//     </form>
//   );
// };

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "asddddd" }),
  age: z.number().min(10),
});

export const CreateDoc = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <input {...register("name")} />
      {errors.name?.message && <p>{errors.name?.message}</p>}
      <input type="number" {...register("age", { valueAsNumber: true })} />
      {errors.age?.message && <p>{errors.age?.message}</p>}
      <input type="submit" />
    </form>
  );
};
