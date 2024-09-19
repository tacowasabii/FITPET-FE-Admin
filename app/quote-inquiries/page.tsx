"use client";

import SearchBar from "@components/SearchBar";
import {
  CalenderIcon,
  DownloadIcon,
  ExportIcon,
  FilterIcon,
  LeftArrowIcon,
  ResetIcon,
  RightArrowIcon,
} from "@public/svg";
import React, { ChangeEvent, useState } from "react";
import DateRangePicker from "@components/DateRangePicker";
import useGetComparisonExcel from "@app/api/hooks/comparison/useGetComparisonExcel";
import useGetComparisonPdf from "@app/api/hooks/comparison/useGetComparisonPdf";
import useGetComparison from "@app/api/hooks/comparison/useGetComparison";
import useSearchComparison from "@app/api/hooks/comparison/useSearchComparison";
import { useToast } from "@chakra-ui/react";
import useDeleteComparison from "@app/api/hooks/comparison/useDeleteComparison";
import DeleteButton from "@components/DeleteButton";
import QuoteStatusButton from "./components/QuoteStatusButton";
import FilterButton from "./components/FilterButton";

function QuoteInquiriesPage() {
  const toast = useToast();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchContent, setSearchContent] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<
    "전체" | "신청접수" | "견적발송" | "상담 중" | "상담종료" | "가입완료"
  >("전체");

  const handleSetStartDate = (date: Date | undefined) => {
    setStartDate(date);
    setIsSearching(false);
  };

  const handleSetEndDate = (date: Date | undefined) => {
    setEndDate(date);
    setIsSearching(false);
  };

  const statusMap = {
    전체: "all",
    신청접수: "PENDING",
    견적발송: "SENT",
    "상담 중": "CONSULTING",
    상담종료: "CONSULT_DONE",
    가입완료: "SIGNED",
  };

  const handleFilterChange = (
    filter:
      | "전체"
      | "신청접수"
      | "견적발송"
      | "상담 중"
      | "상담종료"
      | "가입완료",
  ) => {
    setSelectedStatus(statusMap[filter]);
    setSelectedFilter(filter); // selectedFilter로 변경
    setIsSearching(false);
  };

  const handleSearch = (content: string) => {
    setSearchContent(content);
    setIsSearching(true);
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedStatus("all");
    setSelectedFilter("전체");
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchContent(e.target.value);
  };

  const handleReset = () => {
    setSearchContent("");
    setSelectedFilter("전체");
    setIsSearching(false);
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedStatus("all");
    setPage(0);
  };

  const { data: comparisonData } = useGetComparison(
    {
      page,
      ...(startDate && { startDate: startDate.toISOString().split("T")[0] }),
      ...(endDate && { endDate: endDate.toISOString().split("T")[0] }),
      status: selectedStatus,
    },
    { enabled: !isSearching },
  );

  const { data: searchResults } = useSearchComparison(
    {
      content: searchContent,
      page,
    },
    { enabled: isSearching },
  );

  const { mutate: exportComparisonExcel } = useGetComparisonExcel();
  const { mutate: exportComparisonPdf } = useGetComparisonPdf();

  const handleExportClick = () => {
    if (!startDate || !endDate) {
      toast({
        title: "날짜를 지정해 주세요.",
        status: "warning",
        isClosable: true,
      });
    } else {
      exportComparisonExcel({
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        status: selectedStatus,
      });
    }
  };

  const handleNextPage = () => {
    if (
      (isSearching ? searchResults : comparisonData)?.data.currentPage !==
        undefined &&
      (isSearching ? searchResults : comparisonData)?.data.totalPage !==
        undefined &&
      (isSearching ? searchResults : comparisonData)?.data.currentPage <
        (isSearching ? searchResults : comparisonData)?.data.totalPage
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const { mutate: deleteComparison } = useDeleteComparison();

  const handleDelete = (comparisonId: number) => {
    deleteComparison(comparisonId);
  };

  const data = isSearching ? searchResults : comparisonData;

  return (
    <div className="flex w-full flex-col">
      <div className="ml-6 mt-10 flex items-center gap-4">
        <div className="text-3xl font-medium text-grayscale-90">
          전체 {data?.data.totalElements || 0}건
        </div>
        <button
          type="button"
          onClick={handleExportClick}
          className="flex items-center gap-1 rounded-lg bg-primary-50 px-3 py-1"
        >
          <ExportIcon />
          <div className="text-grayscale-00">모든 리스트 내보내기</div>
        </button>
      </div>
      <div className="ml-6 mt-6">
        <SearchBar
          placeholder="전화번호, 반려동물 이름 등을 검색하세요"
          onSearch={handleSearch}
          value={searchContent}
          onChange={handleSearchInputChange}
        />
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
        <div className="flex items-center gap-2 text-md font-medium">
          <div className="flex items-center gap-1">
            <CalenderIcon />
            <div className="text-grayscale-40">기간</div>
          </div>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={handleSetStartDate}
            setEndDate={handleSetEndDate}
          />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-md font-medium">
            <div className="flex items-center gap-1">
              <FilterIcon />
              <div className="text-grayscale-40">필터</div>
            </div>
            <FilterButton
              filters={[
                "전체",
                "신청접수",
                "견적발송",
                "상담 중",
                "상담종료",
                "가입완료",
              ]}
              onFilterChange={handleFilterChange}
              selectedFilter={selectedFilter}
            />
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 rounded-lg bg-primary-00 px-2 py-1"
          >
            <ResetIcon />
            <div className="text-md font-medium text-primary-50">초기화</div>
          </button>
        </div>
      </div>
      <div className="mt-4 text-sm font-medium">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-grayscale-05 text-grayscale-50">
              <th className="border-b px-6 py-3 font-medium">상태</th>
              <th className="border-b px-6 py-3 font-medium">견적번호</th>
              <th className="border-b px-6 py-3 font-medium">문의 일시</th>
              <th className="border-b px-6 py-3 font-medium">채널</th>
              <th className="border-b px-6 py-3 font-medium">품종</th>
              <th className="border-b px-6 py-3 font-medium">상세 품종</th>
              <th className="border-b px-6 py-3 font-medium">반려동물 이름</th>
              <th className="border-b px-6 py-3 font-medium">만 나이</th>
              <th className="border-b px-6 py-3 font-medium">보호자 연락처</th>
              <th className="border-b px-6 py-3 font-medium">비고</th>
              <th className="border-b px-6 py-3 font-medium">액션</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.content.map((item) => (
              <tr key={item.comparisonId} className="hover:bg-gray-50">
                <td className="border-b px-6 py-4">
                  <QuoteStatusButton
                    comparisonId={item.comparisonId}
                    status={
                      item.status as
                        | "PENDING"
                        | "SENT"
                        | "CONSULTING"
                        | "CONSULT_DONE"
                        | "SIGNED"
                    }
                  />
                </td>
                <td className="border-b px-6 py-4">Q{item.comparisonId}</td>
                <td className="border-b px-6 py-4">{item.createdAt}</td>
                <td className="border-b px-6 py-4">
                  {item.referSite || "웹사이트"}
                </td>
                <td className="border-b px-6 py-4">{item.petType}</td>
                <td className="border-b px-6 py-4">{item.petSpecies}</td>
                <td className="border-b px-6 py-4">{item.petName}</td>
                <td className="border-b px-6 py-4">{item.petAge}</td>
                <td className="border-b px-6 py-4">{item.phoneNumber}</td>
                <td className="border-b px-6 py-4">{item.comment || "-"}</td>
                <td className="flex gap-2 border-b px-6 py-4">
                  <button
                    type="button"
                    onClick={() => exportComparisonPdf(item.comparisonId)}
                    className="flex items-center gap-1 rounded-[4px] bg-primary-00/50 px-3 py-1 text-sm font-medium text-primary-50"
                  >
                    <DownloadIcon />
                    다운로드
                  </button>
                  <DeleteButton
                    onDelete={() => handleDelete(item.comparisonId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QuoteInquiriesPage;
