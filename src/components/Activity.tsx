import React from "react";

// const ActivityItem = ({ activity }) => {
const ActivityItem = () => {
  //   const { id, name, category, startTime, endTime } = activity;
  const start = Date.now();
  const end = 1000;

  const calculateDuration = () => {
    const durationInMilliseconds = end - start;
    const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
      (durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
    );

    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-gray-800 text-white p-4 mb-4 mx-auto rounded-md shadow-md w-full sm:w-2/5">
      <h3 className="text-xl font-semibold mb-2">name</h3>
      <p className="text-gray-400">
        <strong>Category:</strong> category
      </p>
      <p className="text-gray-400">
        <strong>Start Time:</strong>{" "}
        {new Date(start).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p className="text-gray-400">
        <strong>End Time:</strong>{" "}
        {new Date(end).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p className="text-gray-400">
        <strong>Duration:</strong> {calculateDuration()}
      </p>
    </div>
  );
};

export default ActivityItem;
