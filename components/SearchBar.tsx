"use client";

import { ChangeEvent, useState, KeyboardEvent } from "react";
import { SearchIcon } from "@public/svg";

interface SearchBarProps {
  placeholder: string;
  onSearch: (content: string) => void;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({ placeholder, onSearch, value, onChange }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value);
    }
  };

  let IconStyle;

  if (isFocused) {
    IconStyle = "stroke-primary-50";
  } else if (value) {
    IconStyle = "stroke-grayscale-100";
  } else {
    IconStyle = "stroke-grayscale-40";
  }

  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        className="w-[655px] rounded-[100px] py-[10px] pl-12 pr-5 text-md font-medium outline outline-1 outline-grayscale-40 placeholder:text-grayscale-40 focus:outline focus:outline-1 focus:outline-primary-50"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        value={value}
        onKeyDown={handleKeyPress}
      />
      <SearchIcon
        className={`absolute left-5 top-1/2 -translate-y-1/2 transform ${IconStyle}`}
      />
    </div>
  );
}

export default SearchBar;
