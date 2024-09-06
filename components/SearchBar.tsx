"use client";

import { ChangeEvent, useState } from "react";
import { SearchIcon } from "@public/svg";

function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  let IconStyle;

  if (isFocused) {
    IconStyle = "stroke-primary-50";
  } else if (inputValue) {
    IconStyle = "stroke-grayscale-100";
  } else {
    IconStyle = "stroke-grayscale-40";
  }

  return (
    <div className="relative">
      <input
        placeholder="전화번호, 반려동물 이름 등을 검색하세요"
        className="w-[655px] rounded-[100px] py-[10px] pl-12 pr-5 text-md font-medium outline outline-1 outline-grayscale-40 placeholder:text-grayscale-40 focus:outline focus:outline-1 focus:outline-primary-50"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={inputValue}
      />
      <SearchIcon
        className={`absolute left-5 top-1/2 -translate-y-1/2 transform ${
          IconStyle
        }`}
      />
    </div>
  );
}

export default SearchBar;
