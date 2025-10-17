import Padding from "~/components/ui/padding";
import TitleArea from "../main/components/TitleArea";
import BookListArea from "../main/components/BookListArea";
import LikedBooksTitleArea from "./components/LikedBooksTitleArea";
import LikedBooksListArea from "./components/LikedBooksListArea";

const LikedBooksIndexPage = () => {
  return (
    <div className="flex flex-col max-w-[960px] mx-auto">
      <Padding height={64} />
      <LikedBooksTitleArea />
      <Padding height={36} />
      <LikedBooksListArea />
    </div>
  );
};

export default LikedBooksIndexPage;
