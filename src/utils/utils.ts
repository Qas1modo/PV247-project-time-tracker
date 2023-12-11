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

export const colors: { [key: number]: string } = {
  1: "#66c2ff",
  2: "#ff6666",
  3: "#ffd700",
  4: "#98fb98",
  5: "#fa8072",
  6: "#c8a2c8",
  7: "#ff66b2",
  8: "#708090",
  9: "#c0c0c0",
  10: "#008080",
};
