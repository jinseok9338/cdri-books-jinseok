import { BOOK_SEARCH_QUERY } from "~/constants";
import { useGetInfiniteBooks } from "~/hooks/api/useGetBooks";
import { parseAsJson } from "~/lib/nuqs/parsers";
import { useQueryState } from "~/lib/nuqs/useQueryState";
import BookListItem from "~/components/BookListItem";
import BookListSkeleton from "~/components/BookListSkeleton";
import { Loader2 } from "lucide-react";
import NoBooksImage from "~/assets/images/NoBooks.png";

import InfiniteScroll from "react-infinite-scroller";
import { Caption } from "~/components/typo";

const BookListArea = () => {
  const [bookSearchQuery] = useQueryState(
    BOOK_SEARCH_QUERY.key,
    parseAsJson(BOOK_SEARCH_QUERY.schema.parse)
  );

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useGetInfiniteBooks({
      query: bookSearchQuery?.query || "",
      target: bookSearchQuery?.target as "title" | "publisher" | "person",
      sort: bookSearchQuery?.sort || "accuracy",
    });

  const allBooks = data?.pages?.flatMap((page) => page.documents) || [];

  // 로딩 중이면 스켈레톤 표시
  if (isLoading && allBooks.length === 0) {
    return <BookListSkeleton count={5} />;
  }

  // 에러 처리
  if (isError) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-red-500">검색 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  // 검색 결과가 없으면
  if ((allBooks.length === 0 && !isLoading) || !bookSearchQuery?.query) {
    return (
      <div className="w-full max-w-[960px] flex flex-col items-center justify-center py-20">
        <div className="flex flex-col items-center gap-6">
          <img
            src={NoBooksImage}
            alt="검색 결과 없음"
            className="w-[80px] h-[80px] object-contain"
          />
          <div className="text-center">
            <Caption className="text-[var(--color-typo-primary)]">
              검색 결과가 없습니다
            </Caption>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[960px]">
      <InfiniteScroll
        className="w-full"
        pageStart={0}
        threshold={1}
        loadMore={async () => fetchNextPage()}
        hasMore={hasNextPage}
        loader={
          <div key={0} className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        }
      >
        <div className="space-y-0">
          {allBooks.map((book) => (
            <BookListItem key={`${book.isbn}-${book.url}`} book={book} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default BookListArea;
