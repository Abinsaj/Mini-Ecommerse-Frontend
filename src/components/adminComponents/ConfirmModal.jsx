import React from "react";

const ConfirmModal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[300px]">
                <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
                <p className="text-sm text-gray-600 mb-6">Do you really want to delete this product?</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
