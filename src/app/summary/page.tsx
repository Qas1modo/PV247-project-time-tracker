"use client";

import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useListRecords } from "@/hooks/Record/record";
import { useGetActivities } from "@/hooks/Activity/activity";
import { getTimeSpent } from "../utils";
import { useGetCategories } from "@/hooks/Category/category";

// const data = [
//   { id: 0, value: 10, label: "series A" },
//   { id: 1, value: 15, label: "series B" },
//   { id: 2, value: 20, label: "series C" },
// ];

const SummaryPage = () => {
  const { data: records, isLoading: recordsLoading } = useListRecords();
  console.log("data from records: ", records);
  const { data: activities, isLoading: activitiesLoading } = useGetActivities();
  console.log("data from activities: ", activities);

  const { data: categories, isLoading: categoriesLoading } = useGetCategories();

  let totalTimeSpent = 0;

  let timePerActivity: Record<number, any> = {};

  if (records) {
    records.forEach((record) => {
      const timeSpent = getTimeSpent(record.records);
      timePerActivity[record.id] = timeSpent;
      totalTimeSpent += timeSpent;
    });
  }

  // console.log(timePerActivity);

  let data: { id: number; value: number; label: string; }[] = [];

  categories?.forEach((category) => {
    let timeTotal = 0;
    for (const [activityId, timeSpent] of Object.entries(timePerActivity)) {
      // TODO
    }
    data.push({ id: category.id, value: 0, label: category.name });
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
      height={200}
    />
  );
};

export default SummaryPage;
