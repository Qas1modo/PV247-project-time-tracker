"use client";

import React from "react";
import { StartStop } from "./StartStop";
import { useListRecords } from "@/hooks/Record/record";

import { type Record } from "@/types/record";
import { Activity } from "@prisma/client";
import AddRecordDialog from "./AddRecordDialog";

const colors: { [key: number]: string } = {
  1: "#66c2ff",
  2: "#ff6666",
  3: "#ffd700",
  4: "#98fb98",
  5: "#fa8072",
  6: "#c8a2c8",
  7: "#ff66b2",
  8: "#708090",
  9: "#c0c0c0",
  10: "#008080",
};

const getTimeSpent = (activityRecords: Record) => {
  const { id, records } = activityRecords;
  let time = 0;
  const now = Date.now();

  records.forEach((record) => {
    const endedAt = record.endedAt ? new Date(record.endedAt).getTime() : now;
    const startedAt = new Date(record.startedAt).getTime();

    if (endedAt && startedAt) {
      time += endedAt - startedAt;
    }
  });

  return Math.floor(time / 1000);
};

// const ActivityItem = ({ activity }) => {
const ActivityItem = ({
  activity,
  categoryName,
}: {
  activity: Activity;
  categoryName: string | undefined;
}) => {
  // const { categoryId, name, id } = activity;
  // const session = await getServerAuthSession();
  // const category = await getCategoryById({ id: categoryId });
  // if (!session) {
  //   return <></>;
  // }
  // const records = await getUserRecords({ userId: session.user.id });

  // return (
  //   <div className="bg-gray-800 text-white p-4 mb-4 mx-auto rounded-md shadow-md w-full sm:w-2/5">
  //     <h3 className="text-xl font-semibold mb-2">{name}</h3>
  //     <p className="text-gray-400">
  //       <strong>Category: </strong>
  //       {category ? category.name : "Category not found"}
  //     </p>

  //     <StartStop
  //       activityId={id}
  //       timeSpent={getTimeSpent(records.filter((record) => record.id === id))}
  //     />
  //   </div>
  // );

  const { categoryId, name, id } = activity;
  const { data: records, isLoading: recordsLoading } = useListRecords();
  const activityRecords = records?.find((activity) => activity.id === id);

  return (
    <>
      <div
        className="text-white p-4 mb-4 mx-auto rounded-md shadow-md w-full sm:w-2/5"
        style={{ backgroundColor: colors[categoryId] }}
      >
        <div className="flex">
          <div className="flex-grow">
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <p className="text-black">
              <strong>Category: </strong>
              {categoryName ? categoryName : "Category not found"}
            </p>
          </div>
          <div className="flex justify-end items-end">
            <AddRecordDialog activity={activity} />
          </div>
        </div>
        <div className="flex">
          <div className="flex-grow">
            {recordsLoading ? (
              <>Loading time...</>
            ) : activityRecords === undefined ? (
              <>No records to show.</>
            ) : (
              <StartStop
                activityId={id}
                timeSpent={getTimeSpent(activityRecords)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ActivityItem;
