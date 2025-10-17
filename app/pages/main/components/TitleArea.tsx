import { useQueryClient } from "@tanstack/react-query";
import { GET_BOOKS_KEY } from "~/hooks/api/useGetBooks";
import { BOOK_SEARCH_QUERY } from "~/constants";
import { useQueryState } from "~/lib/nuqs/useQueryState";
import { parseAsJson } from "~/lib/nuqs/parsers";
import { Body2 } from "~/components/typo";

const TitleArea = () => {
  const [bookSearchQuery] = useQueryState(
    BOOK_SEARCH_QUERY.key,
    parseAsJson(BOOK_SEARCH_QUERY.schema.parse).withDefault({
      query: "",
      target: "title",
      sort: "accuracy",
    })
  );

  const queryClient = useQueryClient();

  const queryData = queryClient.getQueryData([
    GET_BOOKS_KEY,
    {
      query: bookSearchQuery.query,
      target: bookSearchQuery.target,
      sort: bookSearchQuery.sort,
    },
  ]) as any;

  const totalCount = queryData?.pages?.[0]?.meta?.total_count || 0;

  return (
    <div className="flex items-center gap-4">
      <Body2 className="text-[var(--color-typo-primary)] font-medium text-base leading-6">
        도서 검색 결과
      </Body2>
      <Body2 className="text-[var(--color-typo-primary)] font-normal text-base leading-6">
        총 <span className="text-[var(--color-primary)]">{totalCount}</span>건
      </Body2>
    </div>
  );
};

export default TitleArea;
