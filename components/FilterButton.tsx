"use client";

import { useOutsideClick } from "@chakra-ui/react";
import { DownTriangleIcon, UpTriangleIcon } from "@public/svg";
import { useRef, useState } from "react";

interface FilterButtonProps {
  filters: string[];
  width?: string;
}

function FilterButton({ filters, width = "w-[60px]" }: FilterButtonProps) {
  const [isFilterButtonOpen, setIsFilterButtonOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref,
    handler: () => setIsFilterButtonOpen(false),
  });

  const handleButtonClick = () => {
    setIsFilterButtonOpen((prev) => !prev);
  };

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
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
