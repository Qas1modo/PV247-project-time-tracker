"use client";

import React, { Suspense, useEffect, useState } from "react";
import ActivityItem from "./Activity";
import AddActivityDialog from "./AddActivityDialog";
import { FilterContainer } from "./FilterContainer";
import { useGetActivities } from "@/hooks/Activity/activity";
import { type Category } from "@/types/category";
import { Activity } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

export const ActivityContainer = ({
  categories,
}: {
  categories: Category[];
}) => {
  const [activeFilters, setActiveFilters] = useState<number[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const { data, isLoading } = useGetActivities();
  const queryClient = useQueryClient();

  const removeActivity = useMutation({
    mutationFn: async (activityId: number) => {
        return await fetch(`/api/activity/${activityId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },
    onSuccess: async (data) => {
        let id = Number(await data.json());
        console.log(id);
        if (!Number.isNaN(id)) {
          setActivities((prevActivities) => prevActivities.filter(a => a.id != id));
        }
        queryClient.refetchQueries();
    },
    onError: (error) => {
        alert(`Error during deletion: ${error}`);
    },
  });

  useEffect(() => {
    if (data !== undefined) {
      setActivities(data);
    }
  }, [data]);

  if (isLoading) {
    return <>Loading...</>;
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
      <div className="flex gap-2 p-4 justify-center flex-wrap">
        <FilterContainer
          categories={categories}
          onClickFilter={onClickFilter}
        />
      </div>
      <div className="flex flex-col flex-wrap justify-start w-full">
        <AddActivityDialog
          categories={categories}
          onAddActivity={handleAddActivity}
        />
        {filteredActivities.map((activity) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            removeActivity={removeActivity}
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
