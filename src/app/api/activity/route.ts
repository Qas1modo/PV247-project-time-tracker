import { createActivity } from "@/server/Activity/activity";
import { object, ValidationError, number, string } from "yup";
import { getServerAuthSession } from "@/server/auth";
import { Prisma } from "@prisma/client";

const activitySchema = object({
  name: string().required(),
  categoryId: number().required(),
});

export const POST = async (req: Request) => {
  const status = await getServerAuthSession();
  if (!status) {
    return new Response(JSON.stringify(null), {
      status: 403,
      statusText: "Unauthorized",
    });
  }
  let data = null;
  try {
    const requestData = await activitySchema.validate(req.body, {
      stripUnknown: true,
    });
    // const requestData = await req.json();
    console.log("POST requestData: ", requestData);
    data = await createActivity({
      name: requestData.name,
      userId: status.user.id,
      categoryId: requestData.categoryId,
    });
  } catch (e) {
    if (e instanceof ValidationError) {
      return new Response(JSON.stringify(e.errors), {
        status: 400,
        statusText: e.message,
      });
    }
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
      statusText: "Unable to update this record, invalid data or permissions",
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
  });
};
