"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputDatePicker from "./input-datepicker";

export const genericDateSchema = z.coerce.date();
export const spriSchema = z.object({
  name: z.string().min(3).max(255),
  birthDate: genericDateSchema,
});

type FormData = z.infer<typeof spriSchema>;

const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(spriSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("oie");
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-2"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        placeholder="Name"
        {...register("name")}
        className={cn(
          "form-control block w-full px-1  py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none peer"
        )}
      />

      <InputDatePicker
        label="Birth Date"
        name="birthDate"
        register={register}
        error={errors.birthDate}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default MyForm;