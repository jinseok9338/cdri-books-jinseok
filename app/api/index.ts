import API from "~/lib/ky";
import z from "zod";

export class BookSearchError extends Error {
  constructor(
    message: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "BookSearchError";
  }
}

export const searchBooksSchema = z.object({
  query: z.string(),
  sort: z.enum(["accuracy", "latest"]).optional(),
  page: z.number().min(1).max(50).optional(),
  size: z.number().optional(),
  target: z.enum(["title", "isbn", "publisher", "person"]).optional(),
});

export interface Meta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}

export interface Document {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
}

export interface BookQueryResponse {
  meta: Meta;
  documents: Document[];
}

export const searchBooks = async (
  searchQuery: z.infer<typeof searchBooksSchema>
) => {
  try {
    const response = await API.get("search/book", {
      searchParams: {
        ...searchQuery,
      },
    });

    const data = await response.json();
    return data as BookQueryResponse;
  } catch (error) {
    console.error("Failed to search books:", error);
    throw new BookSearchError(
      "도서 검색에 실패했습니다. 잠시 후 다시 시도해주세요.",
      error
    );
  }
};
