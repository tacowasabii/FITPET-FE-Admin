import SearchBar from "@components/SearchBar";
import {
  CalenderIcon,
  DownloadIcon,
  ExportIcon,
  FilterIcon,
  LeftArrowIcon,
  RightArrowIcon,
} from "@public/svg";
import React from "react";
import FilterButton from "@components/FilterButton";
import DateRangePicker from "@components/DateRangePicker";
import DeleteButton from "./components/DeleteButton";

function QuoteInquiriesPage() {
  return (
    <div className="flex w-full flex-col">
      <div className="ml-6 mt-10 flex items-center gap-4">
        <div className="text-3xl font-medium text-grayscale-90">전체 240건</div>
        <button
          type="button"
          className="flex items-center gap-1 rounded-lg bg-primary-50 px-3 py-1"
        >
          <ExportIcon />
          <div className="text-grayscale-00">모든 리스트 내보내기</div>
        </button>
      </div>
      <div className="ml-6 mt-6">
        <SearchBar />
      </div>
      <div className="ml-6 mt-8 flex items-center gap-16">
        <div className="flex gap-3">
          <LeftArrowIcon className="stroke-grayscale-15" />
          <div className="flex items-center gap-2">20 / 80</div>
          <RightArrowIcon className="stroke-grayscale-40" />
        </div>
        <div className="flex items-center gap-2 text-md font-medium">
          <div className="flex items-center gap-1">
            <CalenderIcon />
            <div className="text-grayscale-40">기간</div>
          </div>
          <DateRangePicker />
        </div>
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
          />
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
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border-b px-6 py-4">완료</td>
                <td className="border-b px-6 py-4">Q123456</td>
                <td className="border-b px-6 py-4">2024.08.01 12:30</td>
                <td className="border-b px-6 py-4">웹사이트</td>
                <td className="border-b px-6 py-4">푸들</td>
                <td className="border-b px-6 py-4">토이푸들</td>
                <td className="border-b px-6 py-4">코코</td>
                <td className="border-b px-6 py-4">3</td>
                <td className="border-b px-6 py-4">010-1234-5678</td>
                <td className="border-b px-6 py-4">-</td>
                <td className="flex gap-2 border-b px-6 py-4">
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-[4px] bg-primary-00/50 px-3 py-1 text-sm font-medium text-primary-50"
                  >
                    <DownloadIcon />
                    다운로드
                  </button>
                  <DeleteButton />
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
