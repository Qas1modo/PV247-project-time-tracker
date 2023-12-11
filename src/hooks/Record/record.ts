import { useMutation, useQuery } from "@tanstack/react-query";
import { type Records } from "@/types/record";

export const useListRecords = () =>
  useQuery({
    queryKey: ["list", "records"],
    queryFn: async () => {
      const response = await fetch("api/records");
      return (await response.json()) as Records[];
    },
  });

const startRecord = async (data: { activityId: number }) => {
  const response = await fetch("/api/record/start", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const json = await response.json();
  return json;
};

const finishRecord = async (data: { recordId: number }) => {
  const response = await fetch(`/api/record/${data.recordId}/finish`, {
    method: "PUT",
  });

  const json = await response.json();
  return json;
};

const getAllRecords = async () => {
  const response = await fetch(`/api/records`, {
    method: "GET",
  });

  const json = await response.json();

  return json;
};

const addRecord = async (data: {
  activityId: number;
  startedAt: Date;
  endedAt: Date;
}) => {
  const response = await fetch(`/api/record`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const json = await response.json();

  return json;
};

export const useStartRecord = () => useMutation({ mutationFn: startRecord });
export const useFinisrRecord = () => useMutation({ mutationFn: finishRecord });
export const useGetAllRecords = () =>
  useMutation({ mutationFn: getAllRecords });

export const useAddRecord = () => useMutation({ mutationFn: addRecord });
