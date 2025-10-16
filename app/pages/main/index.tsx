import React from "react";
import { Title2 } from "~/components/typo";
import SearchInput from "~/components/ui/SearchInput";
import PopoverSearchForm, {
  type SearchTarget,
} from "~/components/ui/PopoverSearchForm";

const MainIndexPage = () => {
  const handleSearch = (query: string) => {
    console.log("검색어:", query);
    // TODO: 검색 로직 구현
  };

  const handleDetailSearch = (target: SearchTarget, query: string) => {
    console.log("상세검색:", target, query);
    // TODO: 상세 검색 로직 구현
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <Title2 className="text-[var(--color-typo-primary)]">도서 검색</Title2>
        <PopoverSearchForm onSearch={handleDetailSearch} />
      </div>
      <SearchInput onSearch={handleSearch} />
    </div>
  );
};

export default MainIndexPage;
