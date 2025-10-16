import React from "react";
import { Title2 } from "~/components/typo";
import SearchInput from "~/components/ui/SearchInput";
import PopoverSearchForm, {
  type SearchTarget,
} from "~/components/ui/PopoverSearchForm";
import BookListItem from "~/components/BookListItem";
import { mockBooks } from "~/components/MockBooks";

const MainIndexPage = () => {
  const handleSearch = (query: string) => {
    console.log("검색어:", query);
    // TODO: 검색 로직 구현
  };

  const handleDetailSearch = (target: SearchTarget, query: string) => {
    console.log("상세검색:", target, query);
    // TODO: 상세 검색 로직 구현
  };

  const handleBuy = (book: any) => {
    console.log("구매하기:", book.title);
    // TODO: 구매 로직 구현
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <Title2 className="text-[var(--color-typo-primary)]">도서 검색</Title2>
        <PopoverSearchForm onSearch={handleDetailSearch} />
      </div>
      <SearchInput onSearch={handleSearch} />

      {/* 책 목록 예시 */}
      <div className="space-y-4">
        <Title2 className="text-[var(--color-typo-primary)]">
          책 목록 예시
        </Title2>
        <div className="w-full">
          <div>
            {mockBooks.map((book) => (
              <BookListItem key={book.isbn} book={book} onBuy={handleBuy} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainIndexPage;
