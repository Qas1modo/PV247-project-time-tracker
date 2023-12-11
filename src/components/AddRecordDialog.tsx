import { useAddRecord } from "@/hooks/Record/record";
import { Record } from "@prisma/client";
import { Activity } from "@prisma/client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

const AddRecordDialog = ({
  activity,
  onAddRecord,
}: {
  activity: Activity;
  onAddRecord: (newRecord: Record) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const methods = useForm();
  const { mutate: addRecord } = useAddRecord();

  const openDialog = () => {
    setIsOpen(true);
  };

  const cancelDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const onSubmit = (data: any) => {
    addRecord(
      {
        activityId: activity.id,
        startedAt: data.startDate,
        endedAt: data.endDate,
      },
      {
        onSuccess: (data) => {
          onAddRecord(data);
          setIsOpen(false);
        },
      }
    );
  };

  const validateStartDate = (value: string) => {
    const startDate = new Date(value);
    const endDate = new Date(methods.watch("endDate"));
    const isValid = startDate < endDate;

    return isValid || "Start Date must be smaller than End Date";
  };

  return (
    <div>
      <button
        onClick={openDialog}
        className="text-black px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
          Add record
      </button>
      <dialog
        id="add_record_modal"
        className="modal modal-bottom sm:modal-middle"
        open={isOpen}
      >
        <div className="modal-box">
          <div className="p-4 text-white">
            <strong>Add record for {activity.name}</strong>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-4 p-4">
                <label className="block text-white text-sm font-bold mb-2">
                  Start Date:
                </label>
                <input
                  className="text-white"
                  type="datetime-local"
                  defaultValue={new Date(new Date().getTime() - 60 * 60 * 1000)
                    .toISOString()
                    .slice(0, 16)}
                  {...methods.register("startDate", {
                    required: true,
                    validate: validateStartDate,
                  })}
                />
                {methods.formState.errors.startDate?.message && (
                  <p className="text-xs text-red-600">
                    {"Start Date must be smaller than End Date"}
                  </p>
                )}

                <label className="block text-white text-sm font-bold mb-2">
                  End Date:
                </label>
                <input
                className="text-white"
                  type="datetime-local"
                  defaultValue={new Date().toISOString().slice(0, 16)}
                  {...methods.register("endDate", { required: true })}
                />
              </div>
              <div className="flex justify-between p-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Add
                </button>
                <button
                  onClick={cancelDialog}
                  className="text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </dialog>
    </div>
  );
};

export default AddRecordDialog;
