"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Record } from "@prisma/client";

const Records = ({activityId, activityName}: {
    activityId: number,
    activityName: string
}) => {
    const queryClient = useQueryClient();
    const { data, status } = useQuery({
        queryKey: ["activityRecord"],
        queryFn: async () => {
          const response = await fetch(`/api/records/${activityId}`);
          return (await response.json()) as Record[];
        }
    });
    const removeRecord = useMutation({
        mutationFn: async (recordId: number) => {
            return await fetch(`/api/record/${recordId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },
        onSuccess: () => {
            queryClient.refetchQueries();
        },
        onError: (error) => {
            alert(`Error during deletion: ${error}`);
        },
    });
    if (status === 'pending') {
        return <div>Loading</div>;
    }
    const records = data ?? [];
    console.log("The type of variable is", )
    return (
        <div className="p-8">
            <div className="font-bold mb-2 text-xl">Activity name: { activityName }</div>
            <ul className="flex flex-col">
                {records.map((record) => (
                <li key={record.id} className="flex gap-2 flex-row justify-between items-center border p-2 mb-2 w-full">
                    <div className="font-semibold">{record.id}</div>
                    <div className="w-72">{(new Date(record?.startedAt ?? "").toUTCString())}</div>
                    <div className="w-72">{record.endedAt ? (new Date(record?.endedAt ?? "").toUTCString()) : "Not yet finished"}</div>
                    <button
                    onClick={() => removeRecord.mutate(record.id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                    ❌
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default Records;