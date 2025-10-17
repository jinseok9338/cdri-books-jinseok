import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import closeGrayIcon from "~/assets/icons/close-gray.svg";
import arrowDownIcon from "~/assets/icons/arrow-down.svg";
import { useQueryState } from "~/lib/nuqs/useQueryState";
import { BOOK_SEARCH_QUERY } from "~/constants";
import { parseAsJson } from "~/lib/nuqs/parsers";

export type SearchTarget = "title" | "publisher" | "person";

interface PopoverSearchFormProps {}

const searchTargetOptions: { value: SearchTarget; label: string }[] = [
  { value: "title", label: "제목" },
  { value: "person", label: "저자명" },
  { value: "publisher", label: "출판사" },
];

const PopoverSearchForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTarget, setSearchTarget] = useState<SearchTarget>("title");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [, setBookSearchQuery] = useQueryState(
    BOOK_SEARCH_QUERY.key,
    parseAsJson(BOOK_SEARCH_QUERY.schema.parse)
  );

  const handleSearch = () => {
    setBookSearchQuery((prev) => ({
      ...prev,
      target: searchTarget,
      query: searchQuery.trim(),
    }));
    setIsOpen(false);
    setSearchQuery("");
    setSearchTarget("title");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleSelectTarget = (target: SearchTarget) => {
    setSearchTarget(target);
    setIsDropdownOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center justify-center gap-2 px-2.5 py-1.5 border border-[var(--color-typo-subtitle)] rounded-lg text-sm font-medium text-[var(--color-typo-subtitle)] hover:bg-gray-50">
          상세검색
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[360px] p-0" align="center">
        <div className="relative bg-white rounded-lg shadow-lg p-6">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 w-5 h-5 hover:opacity-70"
          >
            <img src={closeGrayIcon} alt="close" className="w-full h-full" />
          </button>

          <div className="space-y-4 mt-2">
            <div className="flex gap-2">
              <div className="relative w-[100px]">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full h-9 px-2 flex items-center justify-between text-sm font-bold text-[var(--color-typo-primary)] border-b border-[#D2D6DA]"
                >
                  <span>
                    {
                      searchTargetOptions.find(
                        (opt) => opt.value === searchTarget
                      )?.label
                    }
                  </span>
                  <img src={arrowDownIcon} alt="dropdown" className="w-4 h-4" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    {searchTargetOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSelectTarget(option.value)}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-[var(--color-typo-primary)]"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="검색어 입력"
                  className="w-full h-9 px-2 text-sm border-b border-[var(--color-primary)] outline-none text-[var(--color-typo-primary)] placeholder:text-[var(--color-typo-subtitle)]"
                />
              </div>
            </div>

            <Button
              onClick={handleSearch}
              className="w-full h-9 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary)]/90"
            >
              검색하기
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverSearchForm;
