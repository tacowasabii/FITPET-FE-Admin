8"use client";

import useDeleteReferSite from "@app/api/hooks/refersite/useDeleteReferSite";
import useGetRefersite from "@app/api/hooks/refersite/useGetReferSites";
import useSearchReferSite from "@app/api/hooks/refersite/useSearchReferSite";
import DeleteButton from "@components/DeleteButton";
import SearchBar from "@components/SearchBar";
import {
  AddIcon,
  LeftArrowIcon,
  ResetIcon,
  RightArrowIcon,
  SettingIcon,
} from "@public/svg";
import React, { ChangeEvent, useState } from "react";
import CreateUrlModal from "./components/CreateUrlModal";
import UpdateUrlModal from "./components/UpdateUrlModal";

function UrlManagementPage() {
  const [page, setPage] = useState<number>(0);
  const [searchContent, setSearchContent] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isCreateUrlModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateUrlModalOpen, setIsUpdateUrlModalOpen] =
    useState<boolean>(false);
  const [selectedReferSiteId, setSelectedReferSiteId] = useState<number | null>(
    null,
  );

  const { data: searchResults } = useSearchReferSite(
    {
      content: searchContent,
      page,
    },
    { enabled: isSearching },
  );

  const { data: referSitesData } = useGetRefersite(page, {
    enabled: !isSearching,
  });

  const data = isSearching ? searchResults : referSitesData;

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

  const { mutate: deleteReferSite } = useDeleteReferSite();

  const handleDelete = (referSiteId: number) => {
    deleteReferSite(referSiteId);
  };

  const handleSearch = (content: string) => {
    setSearchContent(content);
    setIsSearching(!!content);
    setPage(0);
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchContent(e.target.value);
  };

  const handleReset = () => {
    setSearchContent("");
    setIsSearching(false);
    setPage(0);
  };

  const handleUpdateClick = (referSiteId: number) => {
    setSelectedReferSiteId(referSiteId);
    setIsUpdateUrlModalOpen(true);
  };

  const selectedReferSite = data?.data.content.find(
    (item) => item.refSiteId === selectedReferSiteId,
  );

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="ml-6 mt-10 flex items-center gap-4">
          <div className="text-3xl font-medium text-grayscale-90">
                      전체 {data?.data.totalElements || 0}건
          </div>
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1 rounded-lg bg-primary-50 px-3 py-1"
          >
            <AddIcon />
            <div className="text-grayscale-00">URL 추가하기</div>
          </button>
        </div>
        <div className="ml-6 mt-6 flex items-center gap-4">
          <SearchBar
            placeholder="채널명, url 등을 검색하세요"
            onSearch={handleSearch}
            value={searchContent}
            onChange={handleSearchInputChange}
          />
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 rounded-lg bg-primary-00 px-2 py-1"
          >
            <ResetIcon />
            <div className="text-md font-medium text-primary-50">초기화</div>
          </button>
        </div>
        <div className="ml-6 mt-8 flex gap-3">
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
        <div className="mt-4 text-sm font-medium">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-grayscale-05 text-grayscale-50">
                <th className="border-b px-6 py-3 font-medium">상태</th>
                <th className="border-b px-6 py-3 font-medium">
                  유입채널 한글명
                </th>
                <th className="border-b px-6 py-3 font-medium">채널</th>
                <th className="border-b px-6 py-3 font-medium">url</th>
                <th className="border-b px-6 py-3 font-medium">삭제</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.content.map((item) => (
                <tr key={item.refSiteId} className="hover:bg-gray-50">
                  <td className="border-b px-6 py-4">
                    <SettingIcon
                      onClick={() => handleUpdateClick(item.refSiteId)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="border-b px-6 py-4">{item.channelKor}</td>
                  <td className="border-b px-6 py-4">{item.channel}</td>
                  <td className="border-b px-6 py-4">{item.url}</td>
                  <td className="border-b px-6 py-4">
                    <DeleteButton
                      onDelete={() => handleDelete(item.refSiteId)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isCreateUrlModalOpen && (
        <CreateUrlModal onClose={() => setIsCreateModalOpen(false)} />
      )}
      {isUpdateUrlModalOpen && selectedReferSiteId !== null && (
        <UpdateUrlModal
          referSiteId={selectedReferSiteId}
          onClose={() => setIsUpdateUrlModalOpen(false)}
          initialData={selectedReferSite}
        />
      )}
    </>
  );
}

export default UrlManagementPage;
