/* eslint-disable react/no-array-index-key */
import DeleteButton from "@components/DeleteButton";
import SearchBar from "@components/SearchBar";
import {
  AddIcon,
  LeftArrowIcon,
  RightArrowIcon,
  SettingIcon,
} from "@public/svg";
import React from "react";

function UrlManagementPage() {
  return (
    <div className="flex w-full flex-col">
      <div className="ml-6 mt-10 flex items-center gap-4">
        <div className="text-3xl font-medium text-grayscale-90">전체 240건</div>
        <button
          type="button"
          className="flex items-center gap-1 rounded-lg bg-primary-50 px-3 py-1"
        >
          <AddIcon />
          <div className="text-grayscale-00">URL 추가하기</div>
        </button>
      </div>
      <div className="ml-6 mt-6">
        <SearchBar />
      </div>
      <div className="ml-6 mt-8 flex gap-3">
        <LeftArrowIcon className="stroke-grayscale-15" />
        <div className="flex items-center gap-2">20 / 80</div>
        <RightArrowIcon className="stroke-grayscale-40" />
      </div>
      <div className="mt-4 text-sm font-medium">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-grayscale-05 text-grayscale-50">
              <th className="border-b px-6 py-3 font-medium">상태</th>
              <th className="border-b px-6 py-3 font-medium">
                유입채널 한글명
              </th>
              <th className="border-b px-6 py-3 font-medium">url</th>
              <th className="border-b px-6 py-3 font-medium">채널</th>
              <th className="border-b px-6 py-3 font-medium">삭제</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border-b px-6 py-4">
                  <SettingIcon />
                </td>
                <td className="border-b px-6 py-4">네이버파워링크</td>
                <td className="border-b px-6 py-4">npl</td>
                <td className="border-b px-6 py-4">
                  https://smartcoverins.co.kr/comparison_npl
                </td>
                <td className="border-b px-6 py-4">
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

export default UrlManagementPage;
