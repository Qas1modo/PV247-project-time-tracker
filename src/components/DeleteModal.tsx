"use client";

import { MouseEventHandler, useState } from "react";
import { set } from "zod";

export const DeleteModal = ({
  handleConfirmDelete,
  buttonDesign,
}: {
  handleConfirmDelete: MouseEventHandler<HTMLButtonElement>;
  buttonDesign?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(false);
    handleConfirmDelete(e);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(false);
  };
  return (
    <>
      <button
        onClick={handleDeleteClick}
        className={
          buttonDesign
            ? buttonDesign
            : "p-2 text-red-800 hover:text-red-700 hover:bg-white rounded-md cursor-pointer transition duration-300"
        }
      >
        Delete Activity 🗑️
      </button>
      <dialog
        id="add_record_modal"
        className="modal modal-bottom sm:modal-middle"
        open={isOpen}
      >
        <div className="fixed font-normal text-base top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className="text-black">
              Are you sure you want to delete this activity?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleConfirm}
                className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
