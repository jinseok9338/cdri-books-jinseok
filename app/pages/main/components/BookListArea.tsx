import { BOOK_SEARCH_QUERY } from "~/constants";
import { useGetInfiniteBooks } from "~/hooks/api/useGetBooks";
import { parseAsJson } from "~/lib/nuqs/parsers";
import { useQueryState } from "~/lib/nuqs/useQueryState";

const BookListArea = () => {
  const [bookSearchQuery] = useQueryState(
    BOOK_SEARCH_QUERY.key,
    parseAsJson(BOOK_SEARCH_QUERY.schema.parse).withDefault({
      query: "",
      target: "title",
      sort: "accuracy",
    })
  );

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useGetInfiniteBooks({
      query: bookSearchQuery.query,
      target: bookSearchQuery.target as "title" | "publisher" | "person",
      sort: bookSearchQuery.sort,
    });

  return <div>BookListArea</div>;
};

export default BookListArea;
