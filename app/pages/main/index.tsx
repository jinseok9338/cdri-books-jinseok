import React from "react";
import { Title2 } from "~/components/typo";
import SearchInput from "~/components/ui/SearchInput";

const MainIndexPage = () => {
  const handleSearch = (query: string) => {
    console.log("검색어:", query);
    // TODO: 검색 로직 구현
  };

  return (
    <div className="space-y-8">
      <Title2 className="text-[var(--color-typo-primary)]">도서 검색</Title2>
      <SearchInput onSearch={handleSearch} />
    </div>
  );
};

export default MainIndexPage;
