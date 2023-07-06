import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Components
import Wrapper from "../components/Wrapper";
import Button from "../components/Button";

//
import { Search, DownAngle, RightAngle } from "../components/Icon";

type HeaderProps = {
  siteData: any;
  headerMenu: any[];
};

const Header: React.FC<HeaderProps> = ({ siteData, headerMenu }) => {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<null | number>(null);
  const router = useRouter();

  const onSearchHandler: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (query) {
      router.push(
        {
          pathname: "/search",
          query: {
            q: query,
          },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  const toggleMenu = (id: number) => {
    setOpenId((prev) => {
      if (prev === id) {
        return null;
      } else {
        return id;
      }
    });
  };

  return (
    <>
      <header className="w-full shadow-sm">
        <Wrapper>
          <div className="flex items-center justify-end py-4 lg:justify-between">
            {/* Logo */}
            {siteData.site_logo && (
              <div className="lg:-translate-x-1/2 lg:absolute left-1/2">
                <Link href={"/"}>
                  <h1 className="hidden">{siteData.name}</h1>
                  <img
                    className="h-[26px] lg:h-[34px] block"
                    src={siteData.site_logo.src}
                    alt="Site Logo"
                  />
                </Link>
              </div>
            )}
            <div className="flex-1 lg:hidden"></div>

            {/* Icon */}
            <div className="flex items-center justify-center gap-2 text-gray-500 ">
              <Search size={20} />
              <form onSubmit={onSearchHandler}>
                <input
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-16 md:w-36"
                />
              </form>
            </div>

            <div>
              <a
                href={`${process.env.WORDPRESS_URL}/wp-admin`}
                target="__blank"
                rel="noreferrer"
              >
                <Button variant="left">Sign in</Button>
              </a>
            </div>
          </div>
        </Wrapper>
        <div className="border-b"></div>
        {headerMenu.length > 0 && (
          <Wrapper>
            <div className="relative h-12 overflow-x-auto lg:overflow-x-visible">
              <div className="absolute top-0 left-0 w-auto min-w-full">
                <ul className="flex items-center justify-center h-12 gap-4">
                  {headerMenu.map((menuItem: any, i) => {
                    const isLast = i === headerMenu.length - 1;

                    if (menuItem.parent) {
                      return null;
                    }

                    return (
                      <MenuItem
                        key={menuItem.id}
                        menuItem={menuItem}
                        toggleMenu={toggleMenu}
                        openId={openId}
                        isLast={isLast}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
          </Wrapper>
        )}
      </header>
    </>
  );
};

type MenuItemProps = {
  menuItem: any;
  isLast: boolean;
  openId: number | null;
  toggleMenu: (id: number) => void;
};
const MenuItem: React.FC<MenuItemProps> = ({
  menuItem,
  isLast,
  openId,
  toggleMenu,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const hasChildren = menuItem.children.length > 0;

  return (
    <li className="relative flex items-center text-sm font-semibold uppercase oswald">
      <Link href={menuItem.url}>{menuItem.title}</Link>
      {hasChildren && (
        <button
          className="flex items-center justify-center w-3 h-3 ml-1"
          onClick={() => toggleMenu(menuItem.id)}
        >
          {openId === menuItem.id ? (
            <RightAngle size={20} />
          ) : (
            <DownAngle size={20} />
          )}
        </button>
      )}
      {!isLast && <span className="h-4 w-[1px] ml-4 bg-gray-300"></span>}
      {hasChildren && openId === menuItem.id && (
        <div className="absolute z-10 py-1 bg-white border shadow-sm lg:w-52 top-8 border-slate-100">
          <ul>
            {menuItem.children.map((child: any) => (
              <li>
                <Link
                  className="px-3 py-[6px] block hover:bg-slate-100"
                  href={child.url}
                >
                  {child.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default Header;
