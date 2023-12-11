import {
  getActivityById,
  updateActivityName,
  deleteActivityById,
} from "@/server/Activity/activity";

import { object, string, ValidationError } from "yup";
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
    data = await getActivityById({ id: params.id, userId: status.user.id });
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
      statusText: "Unable to find this activity for current user",
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
  });
};

const updateSchema = object({
  name: string().required(),
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
    const requestData = await updateSchema.validate(await req.json(), {
      stripUnknown: true,
    });
    data = await updateActivityName({
      id: params.id,
      name: requestData.name,
      userId: status.user.id,
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
      statusText: "Unable to update this activity, invalid data or permissions",
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
  });
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  const status = await getServerAuthSession();
  if (!status) {
    return new Response(JSON.stringify(null), {
      status: 403,
      statusText: "Unauthorized",
    });
  }
  let id = Number(params.id);
  if (Number.isNaN(id)) {
    return new Response(JSON.stringify(null), {
      status: 400,
      statusText: "Bad request",
    });
  }
  let data = null;
  try {
    data = await deleteActivityById({ id: id, userId: status.user.id });
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
      statusText: "Unable to update this activity, invalid data or permissions",
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
  });
};
