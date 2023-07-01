import React from "react";

//
import Link from "next/link";

// Components
import Wrapper from "../components/Wrapper";
import Button from "../components/Button";

//
import { Search } from "../components/Icon";

type HeaderProps = {
  categories: any[];
};

const Header: React.FC<HeaderProps> = ({ categories = [] }) => {
  return (
    <>
      <header className="w-full shadow-sm">
        <Wrapper>
          <div className="flex items-center justify-end py-4 lg:justify-between">
            {/* Logo */}
            <div className="lg:-translate-x-1/2 lg:absolute left-1/2">
              <Link href={"/"}>
                <img
                  className="h-[26px] lg:h-[34px] block"
                  src="/logo.png"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="flex-1 lg:hidden"></div>

            {/* Icon */}
            <div className="flex items-center justify-center gap-2">
              <Search size={20} />
              <p className="hidden text-sm uppercase lg:block">Search</p>
            </div>

            {/* Buttons */}
            <div>
              <button className="hidden text-sm font-normal uppercase lg:inline hover:underline">
                Sign in
              </button>

              <Button variant="left">Subscribe</Button>
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
                      <li className="text-sm font-semibold uppercase oswald">
                        <Link href={`/category/${category.slug}`}>
                          {category.name}
                        </Link>
                      </li>
                      {!isLast && (
                        <span className="h-4 w-[1px] bg-gray-300"></span>
                      )}
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
