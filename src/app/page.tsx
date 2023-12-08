import Countdown from "../components/Timer";
import { ActivityContainer } from "../components/ActivitiesContainer";
import { FilterContainer } from "@/components/FilterContainer";
import { getActivitiesByUser } from "@/server/Activity/activity";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();
  if (session?.user) {
    return (
      <div className="flex-col mx-36">
        <button></button>
        {/* <Countdown /> */}
        <FilterContainer />
        <ActivityContainer />
      </div>
    );
  } else {
    return <></>;
  }
}
