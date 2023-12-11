"use client";

import { PieChart } from "@mui/x-charts/PieChart";
import {
  PieItemIdentifier,
  DefaultizedPieValueType,
} from "@mui/x-charts/models";
import { useListRecords } from "@/hooks/Record/record";
import { useGetActivities } from "@/hooks/Activity/activity";
import { getTimeSpent } from "@/utils/utils";
import { useGetCategories } from "@/hooks/Category/category";
import { colors } from "@/utils/utils";
import { useState } from "react";
import { Activity } from "@prisma/client";

type PieChartRecord = {
  id: number;
  value: number;
  label: string;
  color?: string;
};

const PieChartComponent = ({
  data,
  handleClick,
}: {
  data: PieChartRecord[];
  handleClick?: (
    _event: React.MouseEvent<SVGPathElement, MouseEvent>,
    _itemIdentifier: PieItemIdentifier,
    item: DefaultizedPieValueType
  ) => void;
}) => {
  return (
    <PieChart
      onClick={handleClick}
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

const SummaryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
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
        value: (timeTotal / totalTimeSpent) * 100,
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
    <div className="flex flex-col items-center justify-center">
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
    </div>
  );
};
export default SummaryPage;
