import { DownTriangleIcon, UpTriangleIcon } from "@public/svg";
import cn from "@utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, useRef, useState } from "react";
import { useOutsideClick } from "@chakra-ui/react";

const ButtonVariants = cva("font-medium text-sm py-1 px-4 rounded-[32px]", {
  variants: {
    status: {
      PENDING: "text-grayscale-60 border-1 border-grayscale-10 bg-white",
      CONSULTING: "text-success bg-success bg-opacity-[0.08]",
      COMPLETED: "text-primary-50 bg-primary-50 bg-opacity-[0.08]",
    },
  },
});

interface StatusButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "id">,
    VariantProps<typeof ButtonVariants> {
  className?: string;
  isDropdownOpen?: boolean;
  id: number;
  status: "PENDING" | "CONSULTING" | "COMPLETED";
  UpdateStatus: (params: { id: number; status: string }) => void;
}

function StatusButton({
  status,
  className,
  id,
  UpdateStatus,
  ...props
}: StatusButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref,
    handler: () => setIsDropdownOpen(false),
  });

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleStatusChange = (newStatus: typeof status) => {
    UpdateStatus({ id, status: newStatus });
    setIsDropdownOpen(false);
  };

  const TriangleIcon = isDropdownOpen ? UpTriangleIcon : DownTriangleIcon;

  const getFillColor = () => {
    switch (status) {
      case "PENDING":
        return "#9696A6";
      case "CONSULTING":
        return "#1EAF8C";
      case "COMPLETED":
        return "#008CFF";
      default:
        return "#9696A6";
    }
  };

  const statusLabel = {
    PENDING: "신청접수",
    CONSULTING: "진행 중",
    COMPLETED: "응대완료",
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        className={cn(ButtonVariants({ status }), className)}
        onClick={toggleDropdown}
        {...props}
      >
        <div className="flex items-center gap-2">
          <div className="w-[49px]">{statusLabel[status]}</div>
          <TriangleIcon fill={getFillColor()} />
        </div>
      </button>
      {isDropdownOpen && (
        <div className="absolute z-10 mt-2 flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-dropdown">
          {["PENDING", "CONSULTING", "COMPLETED"].map((newStatus) => (
            <button
              key={newStatus}
              type="button"
              className={`py-2 text-sm hover:bg-primary-50 hover:text-white ${
                newStatus === status
                  ? "bg-primary-50 text-white"
                  : "text-grayscale-40 hover:bg-primary-50 hover:text-white"
              }`}
              onClick={() => handleStatusChange(newStatus as typeof status)}
            >
              {statusLabel[newStatus as typeof status]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatusButton;
