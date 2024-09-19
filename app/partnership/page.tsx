"use client";

import useDeleteProposal from "@app/api/hooks/proposal/useDeleteProposal";
import useGetProposal from "@app/api/hooks/proposal/useGetProposal";
import useUpdateProposalStatus from "@app/api/hooks/proposal/useUpdateProposalStatus";
import DateRangePicker from "@components/DateRangePicker";
import DeleteButton from "@components/DeleteButton";
import FilterButton from "@components/FilterButton";
import StatusButton from "@components/StatusButton";
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
  const [page, setPage] = useState<number>(0);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const handleSetStartDate = (date: Date | undefined) => {
    setStartDate(date);
  };

  const handleSetEndDate = (date: Date | undefined) => {
    setEndDate(date);
  };
  const statusMap = {
    전체: "all",
    신청접수: "PENDING",
    "진행 중": "CONSULTING",
    응대완료: "COMPLETED",
  };
  const handleFilterChange = (filter: keyof typeof statusMap) => {
    setSelectedStatus(statusMap[filter]);
  };

  const { data } = useGetProposal({
    page,
    ...(startDate && { startDate: startDate.toISOString().split("T")[0] }),
    ...(endDate && { endDate: endDate.toISOString().split("T")[0] }),
    status: selectedStatus,
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
  const { mutate: updateProposalStatus } = useUpdateProposalStatus();

  const handleUpdateStatus = (proposalId: number, status: string) => {
    updateProposalStatus({ proposalId, status });
  };

  const { mutate: deleteProposal } = useDeleteProposal();

  const handleDelete = (inquiryId: number) => {
    deleteProposal(inquiryId);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="ml-6 mt-10 text-3xl font-medium text-grayscale-90">
        전체 {data?.data.totalElements || 0}건
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
        <div className="flex items-center gap-2 text-md font-medium">
          <div className="flex items-center gap-1">
            <FilterIcon />
            <div className="text-grayscale-40">필터</div>
          </div>
          <FilterButton
            filters={["전체", "신청접수", "진행 중", "응대완료"]}
            onFilterChange={handleFilterChange}
          />
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
              <th className="border-b px-6 py-3 font-medium">제휴내용</th>
              <th className="border-b px-6 py-3 font-medium">액션</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.content.map((item) => (
              <tr key={item.proposalId} className="hover:bg-gray-50">
                <td className="border-b px-6 py-4">
                  <StatusButton
                    id={item.proposalId}
                    status={
                      item.status as "PENDING" | "CONSULTING" | "COMPLETED"
                    }
                    UpdateStatus={({ id, status }) =>
                      handleUpdateStatus(id, status)
                    }
                  />
                </td>
                <td className="border-b px-6 py-4">{item.proposalId}</td>
                <td className="border-b px-6 py-4">{item.createdAt}</td>
                <td className="border-b px-6 py-4">{item.name}</td>
                <td className="border-b px-6 py-4">{item.email}</td>
                <td className="border-b px-6 py-4">{item.phoneNum}</td>
                <td className="border-b px-6 py-4">{item.comment}</td>
                <td className="border-b px-6 py-4">
                  <DeleteButton
                    onDelete={() => handleDelete(item.proposalId)}
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

export default PartnershipPage;
