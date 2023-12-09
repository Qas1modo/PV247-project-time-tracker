import { useQuery } from "@tanstack/react-query";

import { type Category } from "@/types/category";

const getCategories = async () => {
  const response = await fetch("/api/categories", { method: "GET" });
  return response.json() as Promise<Category[]>;
};

export const useGetCategories = () =>
  useQuery({ queryKey: ["category"], queryFn: () => getCategories() });

export const useGetCategoryById = (id: number) =>
  useQuery({
    queryKey: ["get", "category", { id }],
    queryFn: async () => {
      const response = await fetch(`api/category/${id}`);
      return (await response.json()) as Category;
    },
  });
