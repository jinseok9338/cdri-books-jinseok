import React, { useState } from "react";
import useRecentSearch from "~/stores/searchQueryStore";
import searchIcon from "~/assets/icons/search.svg";
import closeIcon from "~/assets/icons/close.svg";

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchInput = ({
  onSearch,
  placeholder = "검색어를 입력하세요",
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const { recentSearch, addRecentSearch, removeRecentSearch } =
    useRecentSearch();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      onSearch(query.trim());
      addRecentSearch(query.trim());
      setInputValue("");
      setIsFocused(false);
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
    <div className="bg-[var(--color-light-gray)] rounded-[24px] p-4 w-[480px]">
      {/* Input 영역 */}
      <div className="flex items-center">
        <img src={searchIcon} alt="search" className="w-[30px] h-[30px] mr-3" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 border-none outline-none bg-transparent text-[var(--color-typo-primary)] placeholder:text-[var(--color-typo-subtitle)] text-base"
        />
      </div>

      {/* 검색 기록 리스트 */}
      {isFocused && recentSearch.length > 0 && (
        <div className="mt-4 space-y-3">
          {recentSearch.map((item) => (
            <div
              key={item.timestamp}
              onClick={() => handleHistoryClick(item.searchTerm)}
              className="flex items-center justify-between text-[var(--color-typo-subtitle)] cursor-pointer hover:text-[var(--color-typo-primary)]"
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
      )}
    </div>
  );
};

export default SearchInput;
