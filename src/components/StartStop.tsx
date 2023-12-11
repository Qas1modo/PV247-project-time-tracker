"use client";

import { useFinisrRecord, useStartRecord } from "@/hooks/Record/record";
import { Record } from "@prisma/client";
import { useEffect, useState, useCallback, use } from "react";

export const StartStop = ({
  activityId,
  timeSpent,
  unfinishedRecordId,
  onFinishRecord,
}: {
  activityId: number;
  timeSpent: number;
  unfinishedRecordId: number | undefined;
  onFinishRecord: (record: Record) => void;
}) => {
  const { mutate: startRecording, isPending: startPending } = useStartRecord();
  const { mutate: stopRecording, isPending: stopPending } = useFinisrRecord();

  const [recordId, setRecordId] = useState<number | undefined>(
    unfinishedRecordId
  );
  const [timer, setTimer] = useState(timeSpent);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (unfinishedRecordId !== undefined && !isRunning) {
      startTimer();
      setRecordId(unfinishedRecordId);
    }
  }, [unfinishedRecordId, isRunning]);

  useEffect(() => {
    setTimer(timeSpent);
  }, [timeSpent]);

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
    if (!isRunning)
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

  const handleStop = () => {
    if (recordId && isRunning) {
      stopRecording(
        { recordId },
        {
          onSuccess: (data) => {
            stopTimer();
            onFinishRecord(data);
          },
        }
      );
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <button>
        {/* sun icon */}
        {isRunning && (
          <svg
            className={"swap-on fill-current w-10 h-10"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            onClick={handleStop}
          >
            <path d="M3 21V3h18v18H3Z" />
          </svg>
        )}

        {/* moon icon */}

        {!isRunning && (
          <svg
            className={" swap-off fill-current w-10 h-10"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 34 34"
            onClick={handleStart}
          >
            <path d="M32.16 16.08L8.94 4.47A2.07 2.07 0 0 0 6 6.32v23.21a2.06 2.06 0 0 0 3 1.85l23.16-11.61a2.07 2.07 0 0 0 0-3.7Z" />
          </svg>
        )}
      </button>
      <div>{formatTime(timer)}</div>
    </>
  );
};
