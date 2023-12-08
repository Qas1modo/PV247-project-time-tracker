"use client";

import { useSession } from "next-auth/react";
import {
  useGetAllActivities,
  useGetAllActivitiesByCategory,
} from "@/hooks/Activity/activity";
import ActivityItem from "@/components/Activity";
// zatim rozpracovana nefunkcni komponenta, ktera ma zobrazovat vsechny aktivity uzivatele
const ClientSideActivitiesContainer = () => {
  const sessionInfo = useSession();
  const { mutate: getAllActivitiesByCategory } =
    useGetAllActivitiesByCategory();
  const { mutate: getAllActivities } = useGetAllActivities();
  let activities: any[] = [];
  if (sessionInfo) {
    // activities = await getActivitiesByUser({ userId: sessionInfo.user.id });
    //misto toho volani api pres hooky
  }
  return activities.map((activity) => (
    <ActivityItem key={activity.id} activity={activity} />
  ));
};
