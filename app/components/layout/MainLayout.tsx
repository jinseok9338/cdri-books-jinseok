import { Outlet } from "react-router";
import Header from "./Header";

const MainLayoutComponent = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayoutComponent;
