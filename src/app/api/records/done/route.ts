import { getUserDoneRecords } from "@/server/Record/record";

import { getServerAuthSession } from "@/server/auth";

export const GET = async (
  req: Request,
  { params }: { params: { id: number } },
) => {
  const status = await getServerAuthSession();
  if (!status) {
    return new Response(JSON.stringify(null), {
      status: 403,
      statusText: "Unauthorized",
    });
  }
  let data = null;
  try {
    data = await getUserDoneRecords({ userId: status.user.id });
  } catch {
    return new Response(JSON.stringify(data), {
      status: 500,
      statusText: "Internal server error",
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
  });
};
