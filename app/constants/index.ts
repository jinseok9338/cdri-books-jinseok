import z from "zod";

const bookSearchQuerySchema = z.object({
  query: z.string(),
  sort: z.enum(["accuracy", "latest"]).optional(),
  target: z.string(),
});

export const BOOK_SEARCH_QUERY = {
  key: "bsq",
  schema: bookSearchQuerySchema,
};

export const CURRENT_PAGE_TAB = {
  key: "ct",
  defaultValue: "search",
};
