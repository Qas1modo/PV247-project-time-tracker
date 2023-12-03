"use client";

import React from "react";
import ActivityItem from "./Activity";
import AddActivityDialog from "./AddActivityDialog";

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

const ActivityContainer = ({ activities }) => {
  return (
    <div className="flex flex-wrap justify-start">
      <AddActivityDialog />
      {activities.map((activity) => (
        <ActivityItem key={activity.id} />
      ))}
    </div>
  );
};

export default ActivityContainer;
