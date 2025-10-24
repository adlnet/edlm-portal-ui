'use-strict'

import { Button } from 'flowbite-react';

export default function DeletePlanModal({ open, onClose, onDelete }) {
  
  if (!open) return null;

  return (

    // BACKDROP
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      {/* MODAL */}
      <div className="bg-white rounded-lg shadow-lg w-2/5 px-4 py-4">
        <h2 className="text-lg font-semibold mb-4 pb-4 text-gray-900 border-b">Are you sure you want to delete this plan?</h2>
        <p className="text-gray-600 mb-6 border-b pb-6">
          Deleting your plan is permanent and cannot be undone. All associated goals, progress, and details will be lost. If you proceed, you will need to create a new plan from scratch.
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="hover:text-blue-300 text-blue-700 mr-4"
            onClick={onClose}
          >
            Cancel
          </button>
          <Button
            className="rounded-lg bg-blue-900 text-white hover:bg-blue-600"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            Delete Plan
          </Button>
        </div>
      </div>
    </div>
  );
}