"use client";

import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useListRecords } from "@/hooks/Record/record";
import { useGetActivities } from "@/hooks/Activity/activity";
import { getTimeSpent } from "@/utils/utils";
import { useGetCategories } from "@/hooks/Category/category";
import { colors } from "@/utils/utils";

// const data = [
//   { id: 0, value: 10, label: "series A" },
//   { id: 1, value: 15, label: "series B" },
//   { id: 2, value: 20, label: "series C" },
// ];

const SummaryPage = () => {
  const { data: records, isLoading: recordsLoading } = useListRecords();
  const { data: activities, isLoading: activitiesLoading } = useGetActivities();

  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  if (recordsLoading || activitiesLoading || categoriesLoading) {
    return <>Loading...</>;
  }
  let totalTimeSpent = 0;

  let timePerActivity: Record<number, any> = {};

  if (records) {
    records.forEach((record) => {
      const timeSpent = getTimeSpent(record.records);
      if (!timePerActivity[record.id]) {
        timePerActivity[record.id] = timeSpent;
      } else {
        timePerActivity[record.id] += timeSpent;
      }
      totalTimeSpent += timeSpent;
    });
  }

  let data: { id: number; value: number; label: string; color: string }[] = [];

  categories?.forEach((category) => {
    let timeTotal = 0;
    for (const [activityId, timeSpent] of Object.entries(timePerActivity)) {
      if (
        activities?.find((activity) => activity.id === Number(activityId))
          ?.categoryId === category.id
      ) {
        timeTotal += timeSpent;
      }
    }
    const percentage = (timeTotal / totalTimeSpent) * 100;
    if (timeTotal > 0)
      data.push({
        id: category.id,
        value: percentage,
        label: category.name,
        color: colors[category.id],
      });
  });

  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      height={300}
      slotProps={{
        legend: {
          direction: "column",
          position: { vertical: "middle", horizontal: "right" },
          padding: 30,
          labelStyle: {
            fontSize: 15,
            fill: "white",
          },
        },
      }}
    />
  );
};

export default SummaryPage;
