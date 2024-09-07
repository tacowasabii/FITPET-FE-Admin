"use client";

/* eslint-disable react/no-array-index-key */

import DateRangePicker from "@components/DateRangePicker";
import FilterButton from "@components/FilterButton";
import {
  CalenderIcon,
  FilterIcon,
  LeftArrowIcon,
  RightArrowIcon,
} from "@public/svg";
import React, { useState } from "react";

function PartnershipPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const statusList = ["답변대기", "진행 중", "응대완료"];

  const handleSetStartDate = (date: Date | undefined) => {
    setStartDate(date);
  };

  const handleSetEndDate = (date: Date | undefined) => {
    setEndDate(date);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="ml-6 mt-10 text-3xl font-medium text-grayscale-90">
        전체 240건
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
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={handleSetStartDate}
            setEndDate={handleSetEndDate}
          />
        </div>
        <div className="flex items-center gap-2 text-md font-medium">
          <div className="flex items-center gap-1">
            <FilterIcon />
            <div className="text-grayscale-40">필터</div>
          </div>
          <FilterButton filters={statusList} />
        </div>
      </div>
      <div className="mt-4 text-sm font-medium">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-grayscale-05 text-grayscale-50">
              <th className="border-b px-6 py-3 font-medium">상태</th>
              <th className="border-b px-6 py-3 font-medium">문의번호</th>
              <th className="border-b px-6 py-3 font-medium">문의 일시</th>
              <th className="border-b px-6 py-3 font-medium">성명</th>
              <th className="border-b px-6 py-3 font-medium">이메일</th>
              <th className="border-b px-6 py-3 font-medium">전화번호</th>
              <th className="border-b px-6 py-3 font-medium">문의내용</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border-b px-6 py-4">버튼</td>
                <td className="border-b px-6 py-4">4000000</td>
                <td className="border-b px-6 py-4">2024.08.01 12:30</td>
                <td className="border-b px-6 py-4">손고장난벽시계</td>
                <td className="border-b px-6 py-4">kusitms.reum@gmail.com</td>
                <td className="border-b px-6 py-4">010-6886-8615</td>
                <td className="border-b px-6 py-4">코코</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PartnershipPage;
