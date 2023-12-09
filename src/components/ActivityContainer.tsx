"use client";

import React, { Suspense, useEffect, useState } from "react";
import ActivityItem from "./Activity";
import AddActivityDialog from "./AddActivityDialog";
import { getCategories } from "@/server/Category/category";
import { ClientSideCategoryField } from "./CategoryField";
import { getActivitiesByUser } from "@/server/Activity/activity";
import { useSession } from "next-auth/react";
import { getServerAuthSession } from "@/server/auth";
import { FilterContainer } from "./FilterContainer";
import { getActivities, useGetActivities } from "@/hooks/Activity/activity";
import { type Category } from "@/types/category";

// interface ActivityContainerProps {
//   activities: Activity[];
// }

// interface Activity {
//   id: number;
//   name: string;
//   category: string;
//   startTime: string;
//   endTime: string;
// }

const UserActivities = ({ activeFilters }: { activeFilters: number[] }) => {
  const { data, isLoading } = useGetActivities();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (data === undefined) {
    return <></>;
  }

  // Filter activities based on activeFilters
  const filteredActivities =
    activeFilters.length > 0
      ? data.filter((activity) => activeFilters.includes(activity.categoryId))
      : data;

  return (
    <>
      {filteredActivities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </>
  );
};

export const ActivityContainer = ({
  categories,
}: {
  categories: Category[];
}) => {
  const [activeFilters, setActiveFilters] = useState<number[]>([]);

  const onClickFilter = (evt: React.MouseEvent<HTMLInputElement>) => {
    const clickedFilterId: number = Number((evt.target as HTMLInputElement).id);

    // Check if the clicked filter is already in activeFilters
    const isFilterActive = activeFilters.includes(clickedFilterId);
    // If it's active, remove it; otherwise, add it
    setActiveFilters((prevFilters) => {
      if (isFilterActive) {
        return prevFilters.filter((filterId) => filterId !== clickedFilterId);
      } else {
        return [...prevFilters, clickedFilterId];
      }
    });
  };

  useEffect(() => {
    console.log("active filters changed: ", activeFilters);
  }, [activeFilters]);

  return (
    <>
      <FilterContainer categories={categories} onClickFilter={onClickFilter} />
      <div className="flex flex-wrap justify-start">
        <AddActivityDialog categories={categories} />
        <UserActivities activeFilters={activeFilters} />
      </div>
    </>
  );
};
