import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Components
import Wrapper from "../components/Wrapper";
import Button from "../components/Button";

//
import { Search } from "../components/Icon";

type HeaderProps = {
  siteData: any;
  categories: any[];
};

const Header: React.FC<HeaderProps> = ({ siteData, categories = [] }) => {
  const [query, setQuery] = useState("");
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
        <Wrapper>
          <div className="relative h-12 overflow-x-auto">
            <div className="absolute top-0 left-0 w-auto min-w-full">
              <ul className="flex items-center justify-center h-12 gap-4">
                {categories.map((category: any, i) => {
                  const isLast = i === categories.length - 1;

                  return (
                    <React.Fragment key={category.id}>
                      <li className="flex items-center text-sm font-semibold uppercase oswald">
                        <Link href={`/category/${category.slug}`}>
                          {category.name}
                        </Link>
                        {!isLast && (
                          <span className="h-4 w-[1px] ml-4 bg-gray-300"></span>
                        )}
                      </li>
                    </React.Fragment>
                  );
                })}
              </ul>
            </div>
          </div>
        </Wrapper>
      </header>
    </>
  );
};

export default Header;
