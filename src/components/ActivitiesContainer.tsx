import React, { Suspense } from "react";
import ActivityItem from "./Activity";
import AddActivityDialog from "./AddActivityDialog";
import { getCategories } from "@/server/Category/category";
import { ClientSideCategoryField } from "./CategoryField";
import { getActivitiesByUser } from "@/server/Activity/activity";
import { useSession } from "next-auth/react";
import { getServerAuthSession } from "@/server/auth";

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

const UserActivities = async () => {
  const status = await getServerAuthSession();
  console.log("user status from the session is: ", status);
  let activities: any[] = [];
  if (status) {
    activities = await getActivitiesByUser({ userId: status.user.id });
  }
  return activities.map((activity) => (
    <ActivityItem key={activity.id} activity={activity} />
  ));
};

export const ActivityContainer = async () => {
  return (
    <div className="flex flex-wrap justify-start">
      <AddActivityDialog
        categoryField={
          <Suspense
            fallback={
              <div className="w-96 rounded-lg bg-slate-50 px-2 py-1 shadow">
                Loading...
              </div>
            }
          >
            <ServerSideCategoryField />
          </Suspense>
        }
      />
      <Suspense>
        <UserActivities />
      </Suspense>
    </div>
  );
};
