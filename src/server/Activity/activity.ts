import { db } from "@/server/db";

export const getActivityById = async (data: { id: number }) => {
  const activity = await db.activity.findFirst({
    where: { id: data.id, deleted: false },
  });
  return activity;
};

export const getActivitiesByCategory = async (data: { categoryId: number }) => {
  const activities = await db.activity.findMany({
    where: { categoryId: data.categoryId, deleted: false },
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
    where: { userId: data.userId },
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
  name: string;
}) => {
  const activities = await db.activity.update({
    where: { id: data.id },
    data: { name: data.name },
  });
  return activities;
};

export const createActivity = async (data: {
  name: string;
  userId: number;
  categoryId: number;
}) => {
  const activities = await db.activity.create({
    data: { name: data.name, userId: data.userId, categoryId: data.categoryId },
  });
  return activities;
};

export const deleteActivityById = async (data: { id: number }) => {
  const activityUpdate = db.activity.update({
    where: { id: data.id },
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
