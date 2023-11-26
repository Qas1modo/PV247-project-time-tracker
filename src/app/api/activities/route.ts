import { getActivitiesByUser } from "@/server/Activity/activity";
import { getServerAuthSession } from "@/server/auth";

export const GET = async (req: Request) => {
  const status = await getServerAuthSession();
  if (!status) {
    return new Response(JSON.stringify(null), {
      status: 403,
      statusText: "Unauthorized",
    });
  }
  let data = null;
  try {
    data = await getActivitiesByUser({ userId: status.user.id });
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
