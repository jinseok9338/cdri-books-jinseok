import { useInfiniteQuery } from "@tanstack/react-query";
import type z from "zod";
import { searchBooks, searchBooksSchema } from "~/api";
export const GET_BOOKS_KEY = "getBooks";

const BOOKS_PER_PAGE = 10;

export const useGetInfiniteBooks = (
  searchQuery: Omit<z.infer<typeof searchBooksSchema>, "page" | "size">
) => {
  return useInfiniteQuery({
    queryKey: [GET_BOOKS_KEY, searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      searchBooks({ ...searchQuery, page: pageParam, size: BOOKS_PER_PAGE }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.meta.is_end ? undefined : pages.length + 1,
    initialPageParam: 1,
    enabled: !!searchQuery.query,
  });
};
