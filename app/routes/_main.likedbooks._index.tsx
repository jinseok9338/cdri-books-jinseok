import LikedBooksIndexPage from "~/pages/likedbooks";
import type { Route } from "./+types/_main.likedbooks._index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "책검색 | 좋아요" },
    { name: "description", content: "책검색 | 좋아요" },
  ];
}

const LikedBooksIndex = () => {
  return <LikedBooksIndexPage />;
};

export default LikedBooksIndex;
