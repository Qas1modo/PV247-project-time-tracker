import { type Record } from "@prisma/client";

export const getTimeSpent = (records: Record[]) => {
  if (records === undefined) {
    return 0;
  }
  let time = 0;

  records.forEach((record) => {
    const endedAt = record.endedAt
      ? new Date(record.endedAt).getTime()
      : Date.now();
    const startedAt = new Date(record.startedAt).getTime();

    if (endedAt && startedAt) {
      time += endedAt - startedAt;
    }
  });
  return Math.floor(time / 1000);
};
