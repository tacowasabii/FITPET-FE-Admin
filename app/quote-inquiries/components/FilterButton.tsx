"use client";

import { useOutsideClick } from "@chakra-ui/react";
import { DownTriangleIcon, UpTriangleIcon } from "@public/svg";
import { useRef, useState } from "react";

interface FilterButtonProps<T extends string> {
  filters: T[];
  selectedFilter: T;
  width?: string;
  onFilterChange: (filter: T) => void;
}

function FilterButton<T extends string>({
  filters,
  selectedFilter,
  width = "w-[60px]",
  onFilterChange,
}: FilterButtonProps<T>) {
  const [isFilterButtonOpen, setIsFilterButtonOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref,
    handler: () => setIsFilterButtonOpen(false),
  });

  const handleButtonClick = () => {
    setIsFilterButtonOpen((prev) => !prev);
  };

  const handleFilterClick = (filter: T) => {
    onFilterChange(filter);
    setIsFilterButtonOpen(false);
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={handleButtonClick}
        className="flex items-center gap-[10px] rounded-[90px] border-1 border-primary-50 px-4 py-2 text-primary-50"
      >
        <div className={`${width} text-md`}>{selectedFilter}</div>
        {isFilterButtonOpen ? (
          <UpTriangleIcon fill="#008CFF" />
        ) : (
          <DownTriangleIcon fill="#008CFF" />
        )}
      </button>

      {isFilterButtonOpen && (
        <div className="absolute z-10 mt-2 flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-dropdown">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => handleFilterClick(filter)}
              className={`py-2 ${
                selectedFilter === filter
                  ? "bg-primary-50 text-white"
                  : "text-grayscale-40 hover:bg-primary-50 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterButton;
