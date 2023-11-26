import { db } from "@/server/db";

export const getCategoryById = async (data: { id: number }) => {
  const category = await db.category.findFirst({ where: { id: data.id } });
  return category;
};

export const getCategories = async () => {
  const categories = await db.category.findMany();
  return categories;
};
