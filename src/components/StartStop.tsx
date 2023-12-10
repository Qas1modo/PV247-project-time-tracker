"use client";

import {
  useFinisrRecord,
  useGetAllRecords,
  useStartRecord,
} from "@/hooks/Record/record";
import { useEffect, useState, useCallback } from "react";

export const StartStop = ({
  activityId,
  timeSpent,
}: {
  activityId: number;
  timeSpent: number;
}) => {
  const { mutate: startRecording, isPending: startPending } = useStartRecord();
  const { mutate: stopRecording, isPending: stopPending } = useFinisrRecord();
  const { mutate: getAllRecords, isPending: getAllPending } =
    useGetAllRecords();
  const [recordId, setRecordId] = useState(null);
  const [timer, setTimer] = useState(timeSpent);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    const id = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    setIntervalId(id);
    setIsRunning(true);
  };

  const stopTimer = useCallback(() => {
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
    setIntervalId(null);
    setIsRunning(false);
  }, [intervalId]);

  const handleStart = () => {
    startRecording(
      {
        activityId: activityId,
      },
      {
        onSuccess: (data) => {
          startTimer();
          setRecordId(data.id);
        },
      }
    );
  };

  const handleStop = useCallback(() => {
    if (recordId)
      stopRecording(
        { recordId },
        {
          onSuccess: (data) => {
            stopTimer();
          },
        }
      );
  }, [recordId, stopRecording, stopTimer]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    // const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    //   if (isRunning) {
    //     event.preventDefault();
    //     event.returnValue = "Mas spusteny casovac"; // Some browsers require a return value to display a prompt
    //   }
    // };

    const handleUnload = (event: BeforeUnloadEvent) => {
      if (isRunning) {
        event.preventDefault();
        event.returnValue = ""; // Some browsers require a return value to display a prompt

        handleStop();
      }
    };

    // window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      // window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [handleStop, isRunning, timeSpent]);

  return (
    <>
      <label className="swap">
        <input type="checkbox" />
        {/* sun icon */}
        <svg
          className="swap-on fill-current w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          onClick={handleStart}
        >
          <path d="M3 21V3h18v18H3Z" />
        </svg>

        {/* moon icon */}
        <svg
          className="swap-off fill-current w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 34 34"
          onClick={handleStop}
        >
          <path d="M32.16 16.08L8.94 4.47A2.07 2.07 0 0 0 6 6.32v23.21a2.06 2.06 0 0 0 3 1.85l23.16-11.61a2.07 2.07 0 0 0 0-3.7Z" />
        </svg>
      </label>
      <div>{formatTime(timer)}</div>
    </>
  );
};
