import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Document } from "~/api";

interface LikeBooksStore {
  likedBooks: Map<string, Document>;
  addLikeBook: (book: Document) => void;
  removeLikeBook: (book: Document) => void;
  isLiked: (book: Document) => boolean;
  getLikedBooks: () => Document[];
}

const generateBookKey = (book: Document): string => {
  // isbn 만으로는 unique 가 보장되지 않음
  // book.url 을 추가로 사용
  return `${book.isbn}-${book.url}`;
};

const useLikeBooksStore = create<LikeBooksStore>()(
  persist(
    (set, get) => ({
      likedBooks: new Map(),

      addLikeBook: (book: Document) => {
        const key = generateBookKey(book);
        set((state) => {
          const newLikedBooks = new Map(state.likedBooks);
          newLikedBooks.set(key, book);
          return { likedBooks: newLikedBooks };
        });
      },

      removeLikeBook: (book: Document) => {
        const key = generateBookKey(book);
        set((state) => {
          const newLikedBooks = new Map(state.likedBooks);
          newLikedBooks.delete(key);
          return { likedBooks: newLikedBooks };
        });
      },

      isLiked: (book: Document) => {
        const key = generateBookKey(book);
        return get().likedBooks.has(key);
      },

      getLikedBooks: () => {
        return Array.from(get().likedBooks.values());
      },
    }),
    {
      name: "like-books-storage",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          if (parsed.state?.likedBooks) {
            parsed.state.likedBooks = new Map(parsed.state.likedBooks);
          }
          return parsed;
        },
        setItem: (name, value) => {
          const serialized = {
            ...value,
            state: {
              ...value.state,
              likedBooks: Array.from(value.state.likedBooks.entries()),
            },
          };
          localStorage.setItem(name, JSON.stringify(serialized));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

export default useLikeBooksStore;
