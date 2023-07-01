import React from "react";

import Link from "next/link";

// Components
import Wrapper from "../components/Wrapper";
import { Twitter } from "../components/Icon";
import { Facebook } from "../components/Icon";
import { Wifi } from "../components/Icon";

const iconLinks = [
  { icon: <Twitter size={18} />, path: "/" },
  { icon: <Facebook size={18} />, path: "/" },
  { icon: <Wifi size={18} />, path: "/" },
];

const Links = [
  { label: "lorem", path: "/" },
  { label: "ipsum", path: "/" },
  { label: "lorem", path: "/" },
  { label: "lorem", path: "/" },
  { label: "lorem", path: "/" },
  { label: "lorem", path: "/" },
  { label: "lorem", path: "/" },
];

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col py-[64px] items-center justify-center text-[14px]  px-2 text-center bg-gray-100">
        <Wrapper>
          {/* logo */}
          <div className="mb-[32px]">
            <img
              className="w-[80px] block mx-auto"
              src="/logo.png"
              alt="logo"
            />
          </div>
          {/* icons */}
          <ul className="flex items-center justify-center  gap-4 mb-[32px] ">
            {iconLinks.map((item, i) => (
              <li
                key={i}
                className="p-3 text-gray-500 bg-white rounded-full hover:text-black"
              >
                <Link href={item.path}>{item.icon}</Link>
              </li>
            ))}
          </ul>
          {/* links */}
          <ul className="flex flex-wrap items-center justify-center gap-4 mb-[32px] text-gray-500 ">
            {Links.map((item, i) => (
              <li
                className="font-normal tracking-wide underline hover:no-underline"
                key={i}
              >
                <Link href={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>

          {/* copyright content */}
          <div className="text-gray-500">
            Copyright © 2022 Zox News Theme. Theme by MVP Themes,{" "}
            <span>
              powered by{" "}
              <Link href="/" className="underline hover:no-underline">
                {" "}
                WordPress
              </Link>
            </span>
          </div>
        </Wrapper>
      </footer>
    </>
  );
};

export default Footer;
