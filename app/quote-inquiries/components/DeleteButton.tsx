"use client";

import useDeleteComparison from "@app/api/hooks/comparison/useDeleteComparison";
import DeletePopup from "@components/DeletePopup";
import { DeleteIcon } from "@public/svg";
import { useState } from "react";

interface DeleteButtonProps {
  comparisonId: number;
}

function DeleteButton({ comparisonId }: DeleteButtonProps) {
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const { mutate: deleteComparison } = useDeleteComparison();

  const handleDelete = () => {
    deleteComparison(comparisonId);
    setIsDeletePopupOpen(false);
  };

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
        <DeletePopup
          onClose={() => setIsDeletePopupOpen(false)}
          onDelete={handleDelete} // 팝업에서 삭제 처리
        />
      )}
    </div>
  );
}

export default DeleteButton;
