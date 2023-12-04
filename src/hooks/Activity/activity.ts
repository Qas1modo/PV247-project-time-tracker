import { useMutation } from "@tanstack/react-query";

const addActivity = async (data: { name: string; categoryId: number }) => {
  console.log("addActivity data: ", data);
  const response = await fetch("/api/activity", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const json = await response.json();
  return json;
};

export const useAddActivity = () => useMutation({ mutationFn: addActivity });
