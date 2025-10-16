import type { Route } from "./+types/_main";
import MainLayoutComponent from "~/components/layout/MainLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "책검색 | 메인" },
    { name: "description", content: "책검색 | 메인" },
  ];
}

export default function MainLayout() {
  return <MainLayoutComponent />;
}
