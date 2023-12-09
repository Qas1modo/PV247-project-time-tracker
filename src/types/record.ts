export type Record = {
  id: number;
  records: Array<{
    deleted: boolean;
    activityId: number;
    id: number;
    endedAt: Date | null;
    startedAt: Date;
  }>;
};
