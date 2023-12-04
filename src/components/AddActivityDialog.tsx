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

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Activity } from "@prisma/client";
import { useSession } from "next-auth/react";
import { type ActivityFormSchema } from "@/types/activity";
import { AddActivityZodSchema } from "@/validators/activity";
import { useAddActivity } from "@/hooks/Activity/activity";

// interface ActivityFormProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: SubmitHandler<FormData>;
// }

// interface FormData {
//   name: string;
//   categoryId: string;
//   userId: number;
// }

export const AddActivityDialog = ({
  categoryField,
}: {
  categoryField: React.ReactNode;
}) => {
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
      methods.reset();
    }
  };

  const { data: sessionData, status: sessionStatus } = useSession();
  const { mutate, isPending } = useAddActivity();

  // const useSendActivity = useMutation(async (data: any) => {});

  const myonSubmit = (values) => {
    console.log(values);
    mutate(
      {
        name: values.name,
        categoryId: Number(values.categoryId),
      },
      {
        onSuccess: () => closeDialog(),
        onError: (e) => console.log(e),
      }
    );
    // try {
    //   console.log(values);
    //   // await useSendActivity.mutateAsync(data);
    //   reset(); // Reset the form values after submit
    // } catch (error) {
    //   console.error("Error:", error);
    //   console.error(values);
    // }
    // closeDialog();
  };

  // const methods = useForm<ActivityFormSchema>();

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
            <form
              onSubmit={methods.handleSubmit(myonSubmit, (va) => {
                console.log("neco nefunguje :(", va);
                console.log(sessionData?.user.id);
                console.log(va.categoryId);
              })}
            >
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
                {/* {methods.errors.name?.message && (
                  <RequiredMsg msg={methods.errors.name?.message} />
                )} */}
              </div>
              <div className="mb-4">
                {/* Replace options with your predefined categories */}
                {/* <select {...register("categoryId", { required: true })}>
                  <option value="10">Low</option>
                  <option value="11">Medium</option>
                  <option value="12">High</option>
                </select> */}
                {categoryField}
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
        // TODO open dialog
        onClick={openDialog}
      >
        + Add New Activity
      </button>
    </>
  );
};

export default AddActivityDialog;
