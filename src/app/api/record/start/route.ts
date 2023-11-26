import { startRecord } from "@/server/Record/record";
import { object, ValidationError, number } from "yup";
import { getServerAuthSession } from "@/server/auth";

const startSchenma = object({
  activityId: number().required()
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
    const requestData = await startSchenma.validate(req.body, {
      stripUnknown: true,
    });
    data = await startRecord({
      activityId: requestData.activityId,
      userId: status.user.id,
    });
  } catch (e) {
    if (e instanceof ValidationError) {
      return new Response(JSON.stringify(e.errors), {
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
