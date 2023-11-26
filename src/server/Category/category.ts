import { db } from "@/server/db";

export type Category = {
  name: string;
};

export type FullCategory = {
  id: number;
  name: string;
};

export type CategoryResponse = {
  error?: string;
  category?: FullCategory;
};

export const getCategoryById = async (data: { id: number }) => {
  const category = await db.category.findFirst({ where: { id: data.id } });
  return { category: category };
};

export const getCategoryByName = async (data: Category) => {
  const category = await db.category.findFirst({ where: { name: data.name } });
  return { category: category };
};

export const getCategories = async () => {
  const categories = await db.category.findMany();
  return categories;
};

export const addCategory = async (data: Category) => {
  const exists = await getCategoryByName(data);
  if (exists.category) {
    return { error: "Category already exists" };
  }
  const category = await db.category.create({ data });
  return { category: category };
};

export const updateCategory = async (data: FullCategory) => {
  const categoryToUpdate = await getCategoryById({ id: data.id });
  if (!categoryToUpdate.category) {
    return { error: "Category does not exists" };
  }
  const user = db.category.update({
    where: { id: data.id },
    data: { name: data.name },
  });
  return user;
};

export const deleteCategoryById = async (data: { id: number }) => {
  const category = await db.category.delete({ where: { id: data.id } });
  return { category: category };
};
