import React from "react";
import { Title2 } from "~/components/typo";
import SearchInput from "~/components/ui/SearchInput";
import PopoverSearchForm, {
  type SearchTarget,
} from "~/components/ui/PopoverSearchForm";

import Padding from "~/components/ui/padding";
import SearchFormArea from "./components/SearchFormArea";
import BookListArea from "./components/BookListArea";
import TitleArea from "./components/TitleArea";

const MainIndexPage = () => {
  return (
    <div className="flex flex-col items-center max-w-[960px] mx-auto">
      <Padding height={80} />
      <SearchFormArea />
      <Padding height={24} />
      <TitleArea />
      <Padding height={36} />
      <BookListArea />
    </div>
  );
};

export default MainIndexPage;
