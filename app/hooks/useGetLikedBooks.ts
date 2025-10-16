import { useInfiniteQuery } from "@tanstack/react-query";
import useLikeBooksStore from "~/stores/likeBooksStore";
import type { BookQueryResponse, Document } from "~/api";

const LIKED_BOOKS_KEY = "likedBooks";
const BOOKS_PER_PAGE = 10;

export const useGetLikedBooks = () => {
  const getLikedBooks = useLikeBooksStore((state) => state.getLikedBooks);

  return useInfiniteQuery({
    queryKey: [LIKED_BOOKS_KEY],
    queryFn: ({ pageParam = 1 }) => {
      const allLikedBooks = getLikedBooks();
      const startIndex = (pageParam - 1) * BOOKS_PER_PAGE;
      const endIndex = startIndex + BOOKS_PER_PAGE;
      const pageBooks = allLikedBooks.slice(startIndex, endIndex);

      return {
        meta: {
          total_count: allLikedBooks.length,
          pageable_count: allLikedBooks.length,
          is_end: endIndex >= allLikedBooks.length,
        },
        documents: pageBooks,
      } as BookQueryResponse;
    },
    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(lastPage.meta.total_count / BOOKS_PER_PAGE);
      return pages.length < totalPages ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 0,
  });
};
