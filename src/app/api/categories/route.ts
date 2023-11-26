import { getCategories } from "@/server/Category/category";

export const GET = async () => {
  let data = null;
  try {
    data = await getCategories();
  } catch {
    return new Response(JSON.stringify(null), {
      status: 500,
      statusText: "Internal server error",
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
  });
};
