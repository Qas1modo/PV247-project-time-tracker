import React from "react";
import { StartStop } from "./StartStop";

// const ActivityItem = ({ activity }) => {
const ActivityItem = ({ activity }: { activity: any }) => {
  const { categoryId, name } = activity;

  // const calculateDuration = () => {
  //   const durationInMilliseconds = end - start;
  //   const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
  //   const minutes = Math.floor(
  //     (durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  //   );

  //   return `${hours}h ${minutes}m`;
  // };

  return (
    <div className="bg-gray-800 text-white p-4 mb-4 mx-auto rounded-md shadow-md w-full sm:w-2/5">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-400">
        <strong>Category:</strong>
        {categoryId}
      </p>
      {/* <p className="text-gray-400">
        <strong>Total Time:</strong>{" "}
        {new Date(start).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p> */}
      <StartStop />
    </div>
  );
};

export default ActivityItem;
