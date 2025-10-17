import Padding from "~/components/ui/padding";
import BookListArea from "./components/BookListArea";
import SearchFormArea from "./components/SearchFormArea";
import TitleArea from "./components/TitleArea";

const MainIndexPage = () => {
  return (
    <div className="flex flex-col max-w-[960px] mx-auto">
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
