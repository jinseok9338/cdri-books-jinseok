import { QueryClient } from "@tanstack/react-query";

export const BOOK_SEARCH_QUERY = {
  key: "bsq",
  defaultValue: {
    query: "",
    sort: "",
    page: 1,
    size: 10,
    target: "",
  },
};

export const CURRENT_PAGE_TAB = {
  key: "ct",
  defaultValue: "search",
};
