import Countdown from "../components/Timer";
import { ActivityContainer } from "../components/ActivityContainer";
import { FilterContainer } from "@/components/FilterContainer";
import { getActivitiesByUser } from "@/server/Activity/activity";
import { getServerAuthSession } from "@/server/auth";
import { ServerWrapper } from "@/components/ServerWrapper";

export default async function Home() {
  const session = await getServerAuthSession();
  if (session?.user) {
    return (
      <div className="flex-col mx-36">
        {/* <Countdown /> */}
        {/* <FilterContainer /> */}
        {/* <ActivityContainer /> */}
        <ServerWrapper />
      </div>
    );
  } else {
    return <></>;
  }
}
