import React, { Suspense } from "react";
import ActivityItem from "./Activity";
import AddActivityDialog from "./AddActivityDialog";
import { getCategories } from "@/server/Category/category";
import { ClientSideCategoryField } from "./CategoryField";

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

const ServerSideCategoryField = async () => {
  const categories = await getCategories();
  return <ClientSideCategoryField categories={categories} />;
};

const ActivityContainer = ({ activities }) => {
  return (
    <div className="flex flex-wrap justify-start">
      <AddActivityDialog
        categoryField={
          <>
            <Suspense
              fallback={
                <div className="w-96 rounded-lg bg-slate-50 px-2 py-1 shadow">
                  Loading...
                </div>
              }
            >
              <ServerSideCategoryField />
            </Suspense>
          </>
        }
      />
      {activities.map((activity) => (
        <ActivityItem key={activity.id} />
      ))}
    </div>
  );
};

export default ActivityContainer;
