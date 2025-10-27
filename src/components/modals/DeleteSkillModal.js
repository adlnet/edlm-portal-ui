'use-strict'

import { Button } from 'flowbite-react';

export default function DeleteCompetencyModal({ open, onClose, onDelete }) {
  
  if (!open) return null;

  return (

    // BACKDROP
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      {/* MODAL */}
      <div className="bg-white rounded-lg shadow-lg w-2/5 px-4 py-4">
        <h2 className="text-lg font-semibold mb-4 pb-4 text-gray-900 border-b">Are you sure you want to delete this competency?</h2>
        <p className="text-gray-600 mb-6 border-b pb-6">
          Deleting this competency will permanently remove all associated skills and progress tracking. This action cannot be undone. If you proceed, you will need to recreate the competency and reassign related items manually.
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
            Delete Competency
          </Button>
        </div>
      </div>
    </div>
  );
}