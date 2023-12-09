import { getCategories } from "@/server/Category/category";
import { ActivityContainer } from "./ActivityContainer";

export const ServerWrapper = async () => {
  // categories are predefined - we can fetch them only once
  let categories = await getCategories();
  if (categories === undefined) {
    categories = [];
  }

  return <ActivityContainer categories={categories} />;
};
