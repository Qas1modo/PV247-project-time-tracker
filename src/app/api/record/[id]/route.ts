import { getRecordById } from "@/server/Record/record";

import { updateRecord, deleteRecord } from "@/server/Record/record";
import { object, ValidationError, number, date } from "yup";
import { getServerAuthSession } from "@/server/auth";
import { Prisma } from "@prisma/client";

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
    data = await getRecordById({ id: params.id, userId: status.user.id });
  } catch {
    return new Response(JSON.stringify(data), {
      status: 500,
      statusText: "Internal server error",
    });
  }
  if (data === null) {
    return new Response(JSON.stringify(data), {
      status: 400,
      statusText:
        "Unable to find record with this id belonging to logged in user",
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
  });
};

const updateSchema = object({
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

export const PUT = async (
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
    const requestData = await updateSchema.validate(req.body, {
      stripUnknown: true,
    });
    data = await updateRecord({
      id: params.id,
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

export const DELETE = async (
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
    data = await deleteRecord({ recordId: params.id, userId: status.user.id });
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
      statusText: "Unable to update this record, invalid data or permissions",
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
  });
};
