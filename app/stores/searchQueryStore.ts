import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_RECENT_SEARCH = 8;

export type RecentSearch = {
  searchTerm: string;
  timestamp: number;
};

type RecentSearchStore = {
  recentSearch: RecentSearch[];
  addRecentSearch: (searchTerm: string) => void;
  removeRecentSearch: (searchTerm: string) => void;
  clearRecentSearch: () => void;
};

const useRecentSearch = create<RecentSearchStore>()(
  persist(
    (set) => ({
      recentSearch: [],

      addRecentSearch: (searchTerm: string) => {
        set((state) => {
          let updatedRecentSearch = state.recentSearch.filter(
            (search) => search.searchTerm !== searchTerm
          );

          const newSearch = { searchTerm, timestamp: Date.now() };
          updatedRecentSearch.unshift(newSearch);

          if (updatedRecentSearch.length > MAX_RECENT_SEARCH) {
            updatedRecentSearch.pop();
          }

          return { recentSearch: updatedRecentSearch };
        });
      },

      removeRecentSearch: (searchTerm: string) => {
        set((state) => {
          const updatedRecentSearch = state.recentSearch.filter(
            (search) => search.searchTerm !== searchTerm
          );

          return { recentSearch: updatedRecentSearch };
        });
      },

      clearRecentSearch: () => {
        set({ recentSearch: [] });
      },
    }),
    {
      name: "recent-search-storage",
    }
  )
);

export default useRecentSearch;
