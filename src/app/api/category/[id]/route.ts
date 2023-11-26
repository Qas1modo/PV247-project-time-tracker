import { getCategoryById } from "@/server/Category/category";

export const GET = async (
  req: Request,
  { params }: { params: { id: number } },
) => {
  let category = null;
  try {
    category = await getCategoryById({ id: params.id });
  } catch {
    return new Response(JSON.stringify(null), {
      status: 500,
      statusText: "Internal server error",
    });
  }
  if (category === null) {
    return new Response(JSON.stringify(category), {
      status: 400,
      statusText: "Category does not exists",
    });
  }
  return new Response(JSON.stringify(category), {
    status: 200,
  });
};
