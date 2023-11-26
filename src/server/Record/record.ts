import { db } from "@/server/db";
import { getActivityById } from "../Activity/activity";

export const getRecordById = async (data: { id: number; userId: number }) => {
  const record = await db.record.findFirst({
    where: {
      id: data.id,
      deleted: false,
      activity: {
        deleted: false,
        userId: data.userId,
      },
    },
    select: {
      activity: {
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return record;
};

export const getUserRecords = async (data: { userId: number }) => {
  const records = await db.activity.findMany({
    where: {
      userId: data.userId,
      deleted: false,
    },
    select: {
      name: true,
      records: {
        where: {
          deleted: false,
        },
      },
    },
  });
  return records;
};

export const getUserDoneRecords = async (data: { userId: number }) => {
  const records = await db.activity.findMany({
    where: {
      userId: data.userId,
      deleted: false,
    },
    select: {
      name: true,
      records: {
        where: {
          NOT: [
            {
              endedAt: null,
            },
          ],
          deleted: false,
        },
      },
    },
  });
  return records;
};

export const getUserProgressRecords = async (data: { userId: number }) => {
  const records = await db.activity.findMany({
    where: {
      userId: data.userId,
    },
    select: {
      name: true,
      records: {
        where: {
          endedAt: null,
          deleted: false,
        },
      },
    },
  });
  return records;
};

export const startRecord = async (data: {
  activityId: number;
  userId: number;
}) => {
  if (await getActivityById({ id: data.activityId, userId: data.userId })) {
    return;
  }
  const record = db.record.create({
    data: {
      activityId: data.activityId,
    },
  });
  return record;
};

export const addRecord = async (data: {
  activityId: number;
  userId: number;
  startedAt: Date;
  endedAt: Date;
}) => {
  if (await getActivityById({ id: data.activityId, userId: data.userId })) {
    return;
  }
  const record = db.record.create({
    data: {
      activityId: data.activityId,
      startedAt: data.startedAt,
      endedAt: data.endedAt,
    },
  });
  return record;
};

export const updateRecord = async (data: {
  activityId: number;
  id: number;
  userId: number;
  startedAt: Date;
  endedAt: Date;
}) => {
  if (await getRecordById({ id: data.id, userId: data.userId })) {
    return;
  }
  if (await getActivityById({ id: data.activityId, userId: data.userId })) {
    return;
  }
  const record = db.record.update({
    where: {
      id: data.id,
    },
    data: {
      activityId: data.activityId,
      startedAt: data.startedAt,
      endedAt: data.endedAt,
    },
  });
  return record;
};

export const finishRecord = async (data: {
  userId: number;
  recordId: number;
}) => {
  const record = db.record.update({
    where: {
      id: data.recordId,
      endedAt: null,
      activity: {
        userId: data.userId,
      },
    },
    data: {
      endedAt: Date(),
    },
  });
  return record;
};

export const deleteRecord = async (data: {
  userId: number;
  recordId: number;
}) => {
  const record = db.record.update({
    where: {
      id: data.recordId,
      activity: {
        userId: data.userId,
      },
    },
    data: {
      deleted: true,
    },
  });
  return record;
};
