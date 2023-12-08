import { useMutation } from "@tanstack/react-query";

const addActivity = async (data: { name: string; categoryId: number }) => {
  const response = await fetch("/api/activity", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const json = await response.json();
  return json;
};

const getAllActivitiesByCategory = async (data: { categoryId: number }) => {
  const response = await fetch(`/api/activities/${data.categoryId}`, {
    method: "GET",
  });
  const json = await response.json();
  return json;
};

const getAllActivities = async () => {
  const response = await fetch(`/api/activities`, { method: "GET" });
  const json = await response.json();
  return json;
};

export const useAddActivity = () => useMutation({ mutationFn: addActivity });
export const useGetAllActivitiesByCategory = () =>
  useMutation({ mutationFn: getAllActivitiesByCategory });
export const useGetAllActivities = () =>
  useMutation({ mutationFn: getAllActivities });
