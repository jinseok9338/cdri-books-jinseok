import React from "react";
import { Title2 } from "~/components/typo";
import SearchInput from "~/components/ui/SearchInput";
import PopoverSearchForm, {
  type SearchTarget,
} from "~/components/ui/PopoverSearchForm";

const SearchFormArea = () => {
  return (
    <div className="w-full max-w-[568px] flex flex-col gap-4">
      <div className="h-[36px] flex items-center">
        <Title2 className="text-[var(--color-typo-primary)] text-[22px] font-bold leading-[24px]">
          도서 검색
        </Title2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <SearchInput />
        </div>
        <PopoverSearchForm />
      </div>
    </div>
  );
};

export default SearchFormArea;
