import { MouseEventHandler } from "react";

export const DeleteModal = ({
  handleConfirmDelete,
  handleCancelDelete,
}: {
  handleConfirmDelete: MouseEventHandler<HTMLButtonElement>;
  handleCancelDelete: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="z-10 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md shadow-md">
        <p>Are you sure you want to delete this activity?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleConfirmDelete}
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
          >
            Confirm
          </button>
          <button
            onClick={handleCancelDelete}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
