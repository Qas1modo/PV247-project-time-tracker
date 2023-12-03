import Countdown from "./components/Timer";
import ActivityItem from "./components/Activity";
import ActivityContainer from "./components/ActivitiesContainer";

export default function Home() {
  return (
    <div className="flex-col mx-36">
      <button></button>
      <Countdown />
      <ActivityContainer activities={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
    </div>
  );
}
