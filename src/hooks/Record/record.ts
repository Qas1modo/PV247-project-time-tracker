import { useMutation } from "@tanstack/react-query";

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

export const useStartRecord = () => useMutation({ mutationFn: startRecord });
export const useFinisrRecord = () => useMutation({ mutationFn: finishRecord });
export const useGetAllRecords = () =>
  useMutation({ mutationFn: getAllRecords });
