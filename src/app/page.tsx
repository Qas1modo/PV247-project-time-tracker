import Countdown from "../components/Timer";
import { ActivityContainer } from "../components/ActivitiesContainer";
import { FilterContainer } from "@/components/FilterContainer";
import { getActivitiesByUser } from "@/server/Activity/activity";
import { useSession } from "next-auth/react";

export default async function Home() {
  return (
    <div className="flex-col mx-36">
      <button></button>
      <Countdown />
      <FilterContainer />
      <ActivityContainer />
    </div>
  );
}
