"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("ایمیل نامعتبر است"),
  age: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), "سن باید یک عدد باشد")
    .refine((val) => !val || Number(val) >= 0, "سن باید بزرگتر از صفر باشد"),
});

type FormInputs = z.infer<typeof schema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormInputs) => {
    // Convert age to number if needed
    const processedData = {
      ...data,
      age: data.age ? Number(data.age) : undefined,
    };
    console.log("داده معتبر:", processedData);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register("email")} placeholder="Email" />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <input {...register("age")} placeholder="Age" type="number" />
          {errors.age && <span>{errors.age.message}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
}
