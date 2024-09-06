"use client";

import DeletePopup from "@components/DeletePopup";
import { DeleteIcon } from "@public/svg";
import { useState } from "react";

function DeleteButton() {
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsDeletePopupOpen(true)}
        className="flex items-center gap-1 rounded-[4px] bg-danger bg-opacity-[0.08] px-3 py-1 text-sm font-medium text-danger"
      >
        <DeleteIcon />
        삭제
      </button>
      {isDeletePopupOpen && (
        <DeletePopup onClose={() => setIsDeletePopupOpen(false)} />
      )}
    </div>
  );
}

export default DeleteButton;
