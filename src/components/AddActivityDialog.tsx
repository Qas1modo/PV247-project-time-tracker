"use client";

import React, { useContext, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { type ActivityFormSchema } from "@/types/activity";
import { AddActivityZodSchema } from "@/validators/activity";
import { useAddActivity, useGetActivities } from "@/hooks/Activity/activity";
import { ClientSideCategoryField } from "./CategoryField";

import { type Category } from "@/types/category";
import { Activity } from "@prisma/client";

export const AddActivityDialog = ({
  categories,
  onAddActivity,
}: {
  categories: Category[];
  onAddActivity: (activity: Activity) => void;
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const RequiredMsg = ({ msg }: { msg: string | undefined }) => (
    <p className="text-red-600">{msg}</p>
  );

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      methods.reset();
    }
  };

  const { mutate, isPending } = useAddActivity();

  const onSubmit = (data: ActivityFormSchema) => {
    mutate(
      {
        name: data.name,
        categoryId: Number(data.categoryId),
      },
      {
        onSuccess: (data: Activity) => {
          onAddActivity(data);
          closeDialog();
        },
      }
    );
  };

  const methods = useForm<ActivityFormSchema>({
    resolver: zodResolver(AddActivityZodSchema),
  });

  return (
    <>
      <dialog
        id="add_activity_modal"
        className="modal modal-bottom sm:modal-middle"
        ref={dialogRef}
      >
        <div className="modal-box">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name:
                </label>
                <input
                  className="form-input w-full"
                  type="text"
                  {...methods.register("name")}
                  placeholder="Enter activity name"
                />
              </div>
              <div className="mb-4">
                <ClientSideCategoryField categories={categories} />
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                type="submit"
              >
                Add Activity
              </button>
              <button
                className="text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                type="reset"
                onClick={closeDialog}
              >
                Cancel
              </button>
            </form>
          </FormProvider>
        </div>
      </dialog>
      <button
        className="bg-gray-800 text-white p-4 mb-4 mx-auto rounded-md shadow-md w-full sm:w-2/5"
        onClick={openDialog}
      >
        + Add New Activity
      </button>
    </>
  );
};

export default AddActivityDialog;
