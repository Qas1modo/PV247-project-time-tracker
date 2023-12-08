import React from "react";
import { StartStop } from "./StartStop";
import { getCategoryById } from "@/server/Category/category";
import { getUserRecords } from "@/server/Record/record";
import { getServerAuthSession } from "@/server/auth";

interface Record {
  id: number;
  records: Array<{
    deleted: boolean;
    activityId: number;
    id: number;
    endedAt: Date | null;
    startedAt: Date;
  }>;
}

const getTimeSpent = (records: Record[]) => {
  let time = 0;
  const now = Date.now();

  records.forEach((record) => {
    record.records.forEach((record) => {
      const endedAt = record.endedAt ? new Date(record.endedAt).getTime() : now;
      const startedAt = new Date(record.startedAt).getTime();

      if (endedAt && startedAt) {
        time += endedAt - startedAt;
      }
    });
  });

  return Math.floor(time / 1000);
};

// const ActivityItem = ({ activity }) => {
const ActivityItem = async ({ activity }: { activity: any }) => {
  const { categoryId, name, id } = activity;
  const session = await getServerAuthSession();
  const category = await getCategoryById({ id: categoryId });
  if (!session) {
    return <></>;
  }
  const records = await getUserRecords({ userId: session.user.id });

  return (
    <div className="bg-gray-800 text-white p-4 mb-4 mx-auto rounded-md shadow-md w-full sm:w-2/5">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-400">
        <strong>Category: </strong>
        {category ? category.name : "Category not found"}
      </p>

      <StartStop
        activityId={id}
        timeSpent={getTimeSpent(records.filter((record) => record.id === id))}
      />
    </div>
  );
};

export default ActivityItem;
