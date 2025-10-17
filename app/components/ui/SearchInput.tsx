import React, { useState, useRef } from "react";
import useRecentSearch from "~/stores/searchQueryStore";
import searchIcon from "~/assets/icons/search.svg";
import closeIcon from "~/assets/icons/close.svg";
import { BOOK_SEARCH_QUERY } from "~/constants";
import { useQueryState } from "~/lib/nuqs/useQueryState";
import { parseAsJson } from "~/lib/nuqs/parsers";

const SearchInput = () => {
  const [bookSearchQuery, setBookSearchQuery] = useQueryState(
    BOOK_SEARCH_QUERY.key,
    parseAsJson(BOOK_SEARCH_QUERY.schema.parse)
  );

  const [inputValue, setInputValue] = useState(bookSearchQuery?.query || "");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { recentSearch, addRecentSearch, removeRecentSearch } =
    useRecentSearch();

  const handleSearch = (query: string) => {
    setBookSearchQuery((prev) => ({
      query: query.trim(),
      sort: prev?.sort || "accuracy",
      target: prev?.target || "",
    }));
    setInputValue("");
    addRecentSearch(query.trim());
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(inputValue);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleHistoryClick = (searchTerm: string) => {
    setInputValue(searchTerm);
    handleSearch(searchTerm);
  };

  const handleRemoveHistory = (e: React.MouseEvent, searchTerm: string) => {
    e.stopPropagation();
    removeRecentSearch(searchTerm);
  };

  return (
    <div className="relative">
      <div className="bg-[var(--color-light-gray)] w-full h-[50px] rounded-[24px] p-4 relative z-20 flex items-center">
        <img
          src={searchIcon}
          alt="search"
          className="w-[30px] h-[30px] mr-3 flex-shrink-0"
        />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력하세요"
          className="flex-1 border-none outline-none bg-transparent text-[var(--color-typo-primary)] placeholder:text-[var(--color-typo-subtitle)] text-base"
        />
      </div>

      {isFocused && recentSearch.length > 0 && (
        <div className="absolute top-0 left-0 right-0 bg-[var(--color-light-gray)] rounded-[24px] z-10 pt-[68px] pb-4 px-4">
          <div className="space-y-3">
            {recentSearch.map((item) => (
              <div
                key={item.timestamp}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleHistoryClick(item.searchTerm)}
                className="flex pl-[35px] pr-[9px] items-center justify-between text-[var(--color-typo-subtitle)] cursor-pointer hover:text-[var(--color-typo-primary)]"
              >
                <span className="text-base">{item.searchTerm}</span>
                <button
                  onClick={(e) => handleRemoveHistory(e, item.searchTerm)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <img
                    src={closeIcon}
                    alt="close"
                    className="w-[24px] h-[24px]"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
