import MainIndexPage from "~/pages/main";
import type { Route } from "./+types/_main._index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "책검색 | 메인" },
    { name: "description", content: "책검색 | 메인" },
  ];
}

const MainIndex = () => {
  return <MainIndexPage />;
};

export default MainIndex;
