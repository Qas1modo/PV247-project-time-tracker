export type Records = {
  id: number;
  records: Array<Record>;
};

export type Record = {
    deleted: boolean;
    activityId: number;
    id: number;
    endedAt: Date | null;
    startedAt: Date;
};
