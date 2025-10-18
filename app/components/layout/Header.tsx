import { Link, useLocation } from "react-router";
import { Body1, Title1 } from "~/components/typo";

const Header = () => {
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full h-20 bg-white">
      <div className="px-40 h-full flex items-center">
        <Link to="/" className="flex items-center mr-[400px] text-nowrap">
          <Title1 className="text-[var(--color-typo-primary)] text-[24px] font-bold">
            CERTICOS BOOKS
          </Title1>
        </Link>

        <nav className="flex items-center gap-14">
          <Link to="/" className={`relative text-nowrap `}>
            <Body1 className="text-[20px] font-medium">도서 검색</Body1>
            {isActive("/") && (
              <div className="absolute -bottom-2 left-0 w-full h-px bg-[var(--color-primary)]" />
            )}
          </Link>

          <Link to="/likedbooks" className={`relative text-nowrap`}>
            <Body1 className="text-[20px] font-medium">내가 찜한 책</Body1>
            {isActive("/likedbooks") && (
              <div className="absolute -bottom-2 left-0 w-full h-px bg-[var(--color-primary)]" />
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
