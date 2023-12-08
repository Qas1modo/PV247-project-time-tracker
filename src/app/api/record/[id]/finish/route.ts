import { finishRecord } from "@/server/Record/record";
import { getServerAuthSession } from "@/server/auth";
import { Prisma } from "@prisma/client";

export const PUT = async (
  req: Request,
  { params }: { params: { id: number } }
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
    data = await finishRecord({
      userId: Number(status.user.id),
      recordId: Number(params.id),
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return new Response(JSON.stringify(e.cause), {
        status: 400,
        statusText: e.message,
      });
    }
    return new Response(JSON.stringify(data), {
      status: 500,
      statusText: "Internal server error",
    });
  }
  if (data === null) {
    return new Response(JSON.stringify(data), {
      status: 400,
      statusText: "Unable to start this record, invalid data or permissions",
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
  });
};
