"use client";

import {
  PieItemIdentifier,
  DefaultizedPieValueType,
} from "@mui/x-charts/models";
import { getTimeSpent } from "@/utils/utils";
import { colors } from "@/utils/utils";
import { useState } from "react";
import { Activity, Category } from "@prisma/client";
import PieChartComponent, { PieChartRecord } from "./PieChartComponent";
import { type Records } from "@/types/record";



const SummaryPage = ({records, activities, categories} : {
  records: Records[], 
  activities: Activity[],
  categories: Category[]}) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  let totalTimeSpent = 0;

  let timePerActivity: Record<number, any> = {};

  if (records) {
    records.forEach((record) => {
      const timeSpent = getTimeSpent(record.records);
      timePerActivity[record.id] =
        (timePerActivity[record.id] || 0) + timeSpent;
      totalTimeSpent += timeSpent;
    });
  }

  let data: PieChartRecord[] = [];
  let timePerActivityPerCategory: Record<number, any> = {};

  categories?.forEach((category) => {
    const activitiesInCategory = activities?.filter(
      (activity) => activity.categoryId === category.id
    );

    const activitiesWithTimeSpent = activitiesInCategory?.map((activity) => {
      const timeSpent = timePerActivity[activity.id] || 0;
      return { activity, timeSpent };
    });

    const timeTotal = activitiesWithTimeSpent?.reduce(
      (total, { timeSpent }) => total + timeSpent,
      0
    );

    if (timeTotal && activitiesWithTimeSpent?.length) {
      data.push({
        id: Number(category.id),
        value: +((timeTotal / totalTimeSpent) * 100).toFixed(2),
        label: category.name,
        color: colors[category.id],
      });

      timePerActivityPerCategory[category.id] = activitiesWithTimeSpent;
    }
  });

  const handleClick = (
    _event: React.MouseEvent<SVGPathElement, MouseEvent>,
    _itemIdentifier: PieItemIdentifier,
    item: DefaultizedPieValueType
  ) => {
    setSelectedCategory(Number(item.id));
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      {totalTimeSpent === 0 ? (
        <>😢 No time spent on activities, yet...</>
      ) : (
        <>
          <PieChartComponent data={data} handleClick={handleClick} />
          <div className="mt-10"></div>

          {selectedCategory ? (
            <PieChartComponent
              data={timePerActivityPerCategory[selectedCategory].map(
                (item: { activity: Activity; timeSpent: number }) => ({
                  id: item.activity.id,
                  value: item.timeSpent,
                  label: item.activity.name,
                })
              )}
            />
          ) : (
            <p className="font-xs text-slate-500 ">
              Click on the chart above to see details
            </p>
          )}
        </>
      )}
    </div>
  );
};
export default SummaryPage;
