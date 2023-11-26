import { db } from "@/server/db";

export const getActivityById = async (data: { id: number, userId: number }) => {
  const activity = await db.activity.findFirst({
    where: { id: data.id, userId: data.userId, deleted: false },
  });
  return activity;
};

export const getActivitiesByUserCategory = async (data: {
  categoryId: number;
  userId: number;
}) => {
  const activities = await db.activity.findMany({
    where: { categoryId: data.categoryId, userId: data.userId, deleted: false },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  return activities;
};

export const getActivitiesByUser = async (data: { userId: number }) => {
  const activities = await db.activity.findMany({
    where: { userId: data.userId, deleted: false },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  return activities;
};

export const updateActivityName = async (data: {
  id: number;
  userId: number;
  name: string;
}) => {
  const activity = await db.activity.update({
    where: { id: data.id, userId: data.userId },
    data: { name: data.name },
  });
  return activity;
};

export const createActivity = async (data: {
  name: string;
  userId: number;
  categoryId: number;
}) => {
  const activity = await db.activity.create({
    data: { name: data.name, userId: data.userId, categoryId: data.categoryId },
  });
  return activity;
};

export const deleteActivityById = async (data: {
  id: number;
  userId: number;
}) => {
  const activityUpdate = db.activity.update({
    where: { id: data.id, userId: data.userId },
    data: {
      deleted: true,
    },
  });
  const recordUpdate = db.record.updateMany({
    where: { activityId: data.id },
    data: {
      deleted: true,
    },
  });
  return await db.$transaction([activityUpdate, recordUpdate]);
};
