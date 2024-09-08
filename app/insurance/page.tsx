"use client";

import useGetInsurance from "@app/api/hooks/insurance/useGetInsurance";
import useGetInsuranceExcel from "@app/api/hooks/insurance/useGetInsuranceExcel";
import { Checkbox } from "@chakra-ui/react";
import FilterButton from "@components/FilterButton";
import {
  ExportIcon,
  FilterIcon,
  LeftArrowIcon,
  RightArrowIcon,
} from "@public/svg";
import React, { ChangeEvent, useState } from "react";

function InsurancePage() {
  const [page, setPage] = useState<number>(0);
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [isDogSelected, setIsDogSelected] = useState(false);
  const [isCatSelected, setIsCatSelected] = useState(false);

  const insuranceCompanyList = ["전체", "메리츠", "DB", "삼성", "KB", "현대"];

  const { mutate: exportInsuranceExcel } = useGetInsuranceExcel();

  const handleExportClick = () => {
    exportInsuranceExcel();
  };

  const getPetType = () => {
    if (isDogSelected && isCatSelected) {
      return "all";
    }
    if (isDogSelected) {
      return "DOG";
    }
    if (isCatSelected) {
      return "CAT";
    }
    return "all";
  };

  const { data } = useGetInsurance({
    company: selectedCompany,
    petType: getPetType(),
    page,
  });

  const handleNextPage = () => {
    if (
      data?.data.currentPage !== undefined &&
      data?.data.totalPage !== undefined &&
      data.data.currentPage < data.data.totalPage
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const handleCompanyChange = (company: string) => {
    setSelectedCompany(company);
  };

  const handleDogCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDogSelected(e.target.checked);
  };

  const handleCatCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCatSelected(e.target.checked);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="ml-6 mt-10 flex items-center gap-4">
        <button
          type="button"
          onClick={handleExportClick}
          className="flex items-center gap-1 rounded-lg bg-primary-50 px-3 py-1"
        >
          <ExportIcon />
          <div className="text-grayscale-00">모든 리스트 내보내기</div>
        </button>
      </div>
      <div className="ml-6 mt-8 flex items-center gap-16">
        <div className="flex gap-3">
          <LeftArrowIcon
            className={`cursor-pointer ${
              page > 0 ? "stroke-grayscale-40" : "stroke-grayscale-15"
            }`}
            onClick={handlePreviousPage}
          />
          <div className="flex items-center gap-2">
            <div className="text-primary-50">
              {data?.data.currentPage &&
              data?.data.pageSize &&
              data?.data.numberOfElement
                ? (data.data.currentPage - 1) * data.data.pageSize +
                  data.data.numberOfElement
                : 0}
            </div>
            <div className="text-grayscale-20">/</div>
            <div className="text-grayscale-40">
              {data?.data.totalElements || 0}
            </div>
          </div>
          <RightArrowIcon
            className={`cursor-pointer ${
              data?.data.currentPage !== undefined &&
              data?.data.totalPage !== undefined &&
              data.data.currentPage < data.data.totalPage
                ? "stroke-grayscale-40"
                : "stroke-grayscale-15"
            }`}
            onClick={handleNextPage}
          />
        </div>
        <div className="flex items-center gap-6 text-primary-50">
          <div className="flex items-center gap-2">
            <Checkbox
              isChecked={isDogSelected}
              onChange={handleDogCheckboxChange}
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
              isChecked={isCatSelected}
              onChange={handleCatCheckboxChange}
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
          <FilterButton
            filters={insuranceCompanyList}
            onFilterChange={handleCompanyChange}
          />
        </div>
      </div>
      <div className="mt-4 text-sm font-medium">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-grayscale-05 text-grayscale-50">
              <th className="border-b px-6 py-3 font-medium">회사명</th>
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
            {data?.data.content.map((item) => (
              <tr key={item.insuranceId} className="hover:bg-gray-50">
                <td className="border-b px-6 py-4">{item.company}</td>
                <td className="border-b px-6 py-4">{item.age}</td>
                <td className="border-b px-6 py-4">
                  {item.dogBreedRank || "-"}
                </td>
                <td className="border-b px-6 py-4">{item.renewalCycle}</td>
                <td className="border-b px-6 py-4">{item.coverageRatio}</td>
                <td className="border-b px-6 py-4">{item.deductible}</td>
                <td className="border-b px-6 py-4">{item.compensation}</td>
                <td className="border-b px-6 py-4">{item.premium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InsurancePage;
