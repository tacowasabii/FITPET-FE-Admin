/* eslint-disable react/no-array-index-key */
import { Checkbox } from "@chakra-ui/react";
import FilterButton from "@components/FilterButton";
import { ExportIcon, FilterIcon } from "@public/svg";
import React from "react";

function InSurancePage() {
  const insuranceCompanylist = ["메리츠", "DB", "삼성", "KB", "현대"];
  return (
    <div className="flex w-full flex-col">
      <div className="ml-6 mt-10 flex items-center gap-4">
        <button
          type="button"
          className="flex items-center gap-1 rounded-lg bg-primary-50 px-3 py-1"
        >
          <ExportIcon />
          <div className="text-grayscale-00">모든 리스트 내보내기</div>
        </button>
      </div>
      <div className="ml-6 mt-8 flex items-center gap-16">
        <div className="flex items-center gap-6 text-primary-50">
          <div className="flex items-center gap-2">
            <Checkbox
              borderColor="#008CFF"
              sx={{
                "& .chakra-checkbox__control": {
                  width: "20px",
                  height: "20px",
                  borderRadius: "4px",
                  bg: "white",
                  borderWidth: "1.5px",
                },
                "& .chakra-checkbox__control[data-checked]": {
                  bg: "#008CFF",
                  borderColor: "#008CFF",
                  _hover: {
                    bg: "#008CFF",
                    borderColor: "inherit",
                  },
                },
              }}
            />
            강아지
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              borderColor="#008CFF"
              sx={{
                "& .chakra-checkbox__control": {
                  width: "20px",
                  height: "20px",
                  borderRadius: "4px",
                  bg: "white",
                  borderWidth: "1.5px",
                },
                "& .chakra-checkbox__control[data-checked]": {
                  bg: "#008CFF",
                  borderColor: "#008CFF",
                  _hover: {
                    bg: "#008CFF",
                    borderColor: "inherit",
                  },
                },
              }}
            />
            고양이
          </div>
        </div>
        <div className="flex items-center gap-2 text-md font-medium">
          <div className="flex items-center gap-1">
            <FilterIcon />
            <div className="text-grayscale-40">필터</div>
          </div>
          <FilterButton filters={insuranceCompanylist} width="w-[80px]" />
        </div>
      </div>
      <div className="mt-4 text-sm font-medium">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-grayscale-05 text-grayscale-50">
              <th className="border-b px-6 py-3 font-medium">연령</th>
              <th className="border-b px-6 py-3 font-medium">등급</th>
              <th className="border-b px-6 py-3 font-medium">갱신 주기</th>
              <th className="border-b px-6 py-3 font-medium">보상비율</th>
              <th className="border-b px-6 py-3 font-medium">자부담</th>
              <th className="border-b px-6 py-3 font-medium">1일 보상</th>
              <th className="border-b px-6 py-3 font-medium">보험료</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border-b px-6 py-4">0</td>
                <td className="border-b px-6 py-4">A</td>
                <td className="border-b px-6 py-4">3년</td>
                <td className="border-b px-6 py-4">70%</td>
                <td className="border-b px-6 py-4">1만원</td>
                <td className="border-b px-6 py-4">15만원</td>
                <td className="border-b px-6 py-4">32,163</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InSurancePage;
