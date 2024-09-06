import { CloseIcon } from "@public/svg";

interface DeletePopupProps {
  onClose: () => void;
}

export default function DeletePopup({ onClose }: DeletePopupProps) {
  const handleClose = () => {
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex h-[264px] w-[560px] flex-col items-center overflow-hidden rounded-3xl bg-white font-medium">
        <CloseIcon
          onClick={handleClose}
          className="mr-8 mt-6 cursor-pointer self-end"
        />
        <div className="mt-10 text-2xl">정말 삭제하시겠습니까?</div>
        <div className="flex-grow" />
        <div className="flex h-[70px] w-full text-xl">
          <button
            type="button"
            onClick={handleClose}
            className="h-full w-1/2 border-t-1 border-t-grayscale-10 bg-grayscale-10 text-grayscale-60"
          >
            돌아가기
          </button>
          <button
            type="button"
            className="h-full w-1/2 border-t-1 border-t-primary-50 bg-primary-50 text-grayscale-00"
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}
