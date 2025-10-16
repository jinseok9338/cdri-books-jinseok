import { Outlet } from "react-router";
import type { Route } from "./+types/_main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "책검색 | 메인" },
    { name: "description", content: "책검색 | 메인" },
  ];
}

export default function MainLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
