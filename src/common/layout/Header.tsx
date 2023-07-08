import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
  const [left, setLeft] = useState<number>(0);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const baseMenu = headerMenu.filter((menuItem: any) => !!!menuItem.parent);

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

    const { x: menuX } = menuRef.current!.getBoundingClientRect();

    const menuItem = document.getElementById(`menu-item-${id}`)!;
    const { x } = menuItem.getBoundingClientRect();

    const offset = -8;

    setLeft(x - menuX + offset);
  };

  useEffect(() => {
    setOpenId(null);
    setLeft(0);
  }, [router.asPath]);

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
        {baseMenu.length > 0 && (
          <Wrapper>
            <div
              className="relative h-12 mx-auto overflow-x-auto"
              ref={menuRef}
            >
              <div className="absolute top-0 left-0 min-w-full">
                <ul className="flex items-center justify-center h-12 gap-4">
                  {baseMenu.map((menuItem: any, i) => {
                    const isLast = i === baseMenu.length - 1;
                    const hasChildren = menuItem.children.length > 0;

                    return (
                      <li
                        key={menuItem.id}
                        id={`menu-item-${menuItem.id}`}
                        className="flex items-center text-sm font-semibold uppercase lg:relative oswald"
                      >
                        <Link href={menuItem.url}>{menuItem.title}</Link>

                        {hasChildren && (
                          <button
                            aria-label="Toggle Button"
                            className="flex items-center justify-center w-3 h-3 ml-1"
                            onClick={(e) => toggleMenu(menuItem.id)}
                          >
                            {openId === menuItem.id ? (
                              <RightAngle size={20} />
                            ) : (
                              <DownAngle size={20} />
                            )}
                          </button>
                        )}

                        {!isLast && (
                          <span className="h-4 w-[1px] ml-4 bg-gray-300"></span>
                        )}

                        {hasChildren && openId === menuItem.id && (
                          <Dropdown menu={menuItem.children} left={left} />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="relative" id="header-dropdown"></div>
          </Wrapper>
        )}
      </header>
    </>
  );
};

type DropdownProps = {
  menu: any[];
  left: number;
};
const Dropdown: React.FC<DropdownProps> = ({ menu, left }) => {
  const target = document.getElementById("header-dropdown");

  if (!target) {
    return null;
  }

  return createPortal(
    <div
      className="absolute top-0 z-10 py-1 bg-white border shadow-sm dropdown-position lg:w-52 border-slate-100"
      style={{
        left,
      }}
    >
      <ul>
        {menu.map((child: any) => (
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
    </div>,
    target
  );
};

export default Header;
