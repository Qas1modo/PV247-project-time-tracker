import { useQuery, useMutation } from "@tanstack/react-query";

type Activity = {
  id: number;
  createdAt: Date;
  userId: number;
  categoryId: number;
  deleted: boolean;
  name: string;
};

export const getActivities = async () => {
  const response = await fetch("/api/activities", { method: "GET" });
  return response.json() as Promise<Activity[]>;
};

export const useGetActivities = () =>
  useQuery({ queryKey: ["activity"], queryFn: () => getActivities() });

const addActivity = async (data: { name: string; categoryId: number }) => {
  const response = await fetch("/api/activity", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const json = await response.json();
  return json;
};
export const useAddActivity = () => useMutation({ mutationFn: addActivity });

const getAllActivitiesByCategory = async (data: { categoryId: number }) => {
  const response = await fetch(`/api/activities/${data.categoryId}`, {
    method: "GET",
  });
  const json = await response.json();
  return json;
};
export const useGetAllActivitiesByCategory = () =>
  useMutation({ mutationFn: getAllActivitiesByCategory });
