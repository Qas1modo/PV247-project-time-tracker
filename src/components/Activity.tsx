"use client";

import React, { useEffect, useState } from "react";
import { StartStop } from "./StartStop";
import { useListRecords } from "@/hooks/Record/record";

import { Record } from "@prisma/client";
import { Activity } from "@prisma/client";
import AddRecordDialog from "./AddRecordDialog";
import { record } from "zod";
import Link from "next/link";
import { colors } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const getTimeSpent = (records: Record[]) => {
  if (records === undefined) {
    return 0;
  }
  let time = 0;

  records.forEach((record) => {
    const endedAt = record.endedAt
      ? new Date(record.endedAt).getTime()
      : Date.now();
    const startedAt = new Date(record.startedAt).getTime();

    if (endedAt && startedAt) {
      time += endedAt - startedAt;
    }
  });
  return Math.floor(time / 1000);
};

const ActivityItem = ({
  activity,
  categoryName,
}: {
  activity: Activity;
  categoryName: string | undefined;
}) => {
  const [records, setRecords] = useState<Record[]>([]);
  const { data, isLoading: recordsLoading } = useListRecords();
  const queryClient = useQueryClient();
  useEffect(() => {
    const filteredRecords = data?.find(
      (activityRecord) => activityRecord.id === activity.id
    );
    if (filteredRecords !== undefined) {
      setRecords(filteredRecords.records);
    }
  }, [data, activity.id]);

  const handleAddRecord = (newRecord: Record) => {
    setRecords((prevRecords) => {
      const existingRecordIndex = prevRecords.findIndex(
        (record) => record.id === newRecord.id
      );
      if (existingRecordIndex !== -1) {
        const updatedRecords = [...prevRecords];
        updatedRecords[existingRecordIndex] = newRecord;
        return updatedRecords;
      } else {
        return [...prevRecords, newRecord];
      }
    });
  };
  const removeActivity = useMutation({
    mutationFn: async (activityId: number) => {
        return await fetch(`/api/activity/${activityId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },
    onSuccess: () => {
        queryClient.refetchQueries();
    },
    onError: (error) => {
        alert(`Error during deletion: ${error}`);
    },
  });

  return (
    <>
      <div
        className="relative text-black p-4 mb-4 mx-auto rounded-md shadow-md w-full sm:w-3/5"
        style={{ backgroundColor: colors[activity.categoryId] }}
      >
        <div className="flex">
          <div className="flex-grow">
            <Link href={`/activity/${activity.id}`}>
              <h3 className="text-black text-xl font-semibold mb-2">{activity.name}</h3>
            </Link>
            <p className="text-black">
              <strong>Category: </strong>
              {categoryName ? categoryName : "Category not found"}
            </p>
          </div>
          <div className="flex items-end">
            <div className="pr-8">
              <AddRecordDialog
                activity={activity}
                onAddRecord={handleAddRecord}
              />
            </div>
            {recordsLoading ? (
              <>Loading time...</>
            ) : (
              <div className="flex">
                <div className="flex-grow">
                  <div className="ml-2 mr-2 w-16">
                    <StartStop
                      activityId={activity.id}
                      timeSpent={getTimeSpent(records)}
                      unfinishedRecordId={
                        records.find((record) => record.endedAt === null)?.id
                      }
                      onFinishRecord={handleAddRecord}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => removeActivity.mutate(activity.id)}
          className="text-red-500 hover:text-red-700 cursor-pointer"
          >
          ❌
        </button>
      </div>
    </>
  );
};
export default ActivityItem;
