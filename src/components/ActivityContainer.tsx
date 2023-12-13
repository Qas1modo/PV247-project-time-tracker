"use client";

import React, { useEffect, useState } from "react";
import ActivityItem from "./Activity";
import AddActivityDialog from "./AddActivityDialog";
import { FilterContainer } from "./FilterContainer";
import { useDeleteActivity, useGetActivities } from "@/hooks/Activity/activity";
import { type Category } from "@/types/category";
import { Activity } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "./Loader";

export const ActivityContainer = ({
  categories,
}: {
  categories: Category[];
}) => {
  const [activeFilters, setActiveFilters] = useState<number[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const { data, isLoading } = useGetActivities();
  const { mutate: mutateDeleteActivity } = useDeleteActivity();

  const handleDeleteActivity = (activityId: number) => {
    mutateDeleteActivity(activityId, {
      onSuccess: () => {
        setActivities((prevActivities) =>
          prevActivities.filter((a) => a.id != activityId)
        );
      },
    });
  };

  useEffect(() => {
    if (data !== undefined) {
      setActivities(data);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (data === undefined) {
    return <>Failed to load activities data</>;
  }

  const handleAddActivity = (newActivity: Activity) => {
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

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

  const filteredActivities =
    activeFilters.length > 0
      ? activities.filter((activity) =>
          activeFilters.includes(activity.categoryId)
        )
      : activities;

  return (
    <>
      <div className="flex gap-2 p-4 justify-center flex-wrap bg-black">
        <FilterContainer
          categories={categories}
          onClickFilter={onClickFilter}
        />
      </div>
      <div className="flex flex-col flex-wrap justify-start w-full bg-black">
        <AddActivityDialog
          categories={categories}
          onAddActivity={handleAddActivity}
        />
        {filteredActivities.map((activity) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            removeActivity={handleDeleteActivity}
            categoryName={
              categories.find((category) => category.id === activity.categoryId)
                ?.name
            }
          />
        ))}
      </div>
    </>
  );
};
