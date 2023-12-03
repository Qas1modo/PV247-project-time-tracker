"use client";

// components/ActivityForm.tsx
import React, { useContext, useRef } from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
  FormProvider,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Activity } from "@prisma/client";

const AddActivitySchema = z.object({
  name: z.string().min(3).max(50),
  category: z.string().min(3).max(50),
});

interface ActivityFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<FormData>;
}

interface FormData {
  name: string;
  category: string;
}

export const AddActivityDialog = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  // const [lastActivityId] = useContext(LastActivityContext);
  // const queryClient = useQueryClient();

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
      reset();
    }
  };

  // const useSendActivity = useMutation(async (data: any) => {});

  const onSubmit: SubmitHandler<Activity> = async (data) => {
    try {
      // await useSendActivity.mutateAsync(data);
      reset(); // Reset the form values after submit
    } catch (error) {
      console.error("Error:", error);
    }
    closeDialog();
  };

  const methods = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Activity>({ resolver: zodResolver(AddActivitySchema) });

  return (
    <>
      <dialog
        id="add_activity_modal"
        className="modal modal-bottom sm:modal-middle"
        ref={dialogRef}
      >
        <div className="modal-box">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("name")}
                  placeholder="Enter activity name"
                />
                {errors.name?.message && (
                  <RequiredMsg msg={errors.name?.message} />
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="category"
                >
                  Category:
                </label>
                {/* Replace options with your predefined categories */}
                <select {...register("categoryId", { required: true })}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
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
        // TODO open dialog
        onClick={openDialog}
      >
        + Add New Activity
      </button>
    </>
  );
};

export default AddActivityDialog;
