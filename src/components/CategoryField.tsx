"use client";

import { useFormContext } from "react-hook-form";
import { type ActivityFormSchema } from "@/types/activity";
import { type Category } from "@/types/category";

export const ClientSideCategoryField = ({
  categories,
}: {
  categories: Category[];
}) => {
  const { setValue, watch, register } = useFormContext<ActivityFormSchema>();
  const typeValue = watch("categoryId");

  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="categoryId"
      >
        Category:
      </label>
      <select
        {...register("categoryId")}
        value={typeValue}
        onChange={(ev) => setValue("categoryId", ev.target.value)}
        className="w-96 rounded-lg bg-slate-50 px-2 py-1 shadow text-black"
      >
        {categories.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </>
  );
};
