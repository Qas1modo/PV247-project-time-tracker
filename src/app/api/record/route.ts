import { addRecord } from "@/server/Record/record";
import { object, ValidationError, number, date } from "yup";
import { getServerAuthSession } from "@/server/auth";

const startSchema = object({
  activityId: number().required(),
  startedAt: date().required(),
  endedAt: date()
    .required()
    .when(
      "startedAt",
      (startedAt, yup) =>
        startedAt && yup.min(startedAt, "End time cannot be before start time"),
    ),
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
    const requestData = await startSchema.validate(req.body, {
      stripUnknown: true,
    });
    data = await addRecord({
      userId: status.user.id,
      activityId: requestData.activityId,
      startedAt: requestData.startedAt,
      endedAt: requestData.endedAt,
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
      statusText: "Unable to add this record, invalid data or permissions",
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
  });
};
