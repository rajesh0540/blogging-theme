import React, { useMemo } from "react";

import Link from "next/link";

// Components
import Wrapper from "../components/Wrapper";

type FooterProps = {
  siteData?: any;
  footerMenu: any[];
};

const Footer: React.FC<FooterProps> = ({ siteData, footerMenu }) => {
  const year = useMemo(() => {
    return new Date().getFullYear();
  }, []);

  return (
    <>
      <footer className="flex flex-col py-[64px] items-center justify-center text-[14px]  px-2 text-center bg-gray-100">
        <Wrapper>
          {/* logo */}
          {siteData.site_logo && (
            <div className="mb-[32px]">
              <img
                className="w-[80px] block mx-auto"
                src={./logo.webp}
                alt="Site Logo"
              />
            </div>
          )}

          {footerMenu.length > 0 && (
            <nav className="mb-[32px]">
              <ul className="flex justify-center gap-5">
                {footerMenu.map((menuItem: any) => {
                  return (
                    <li
                      className="text-gray-500 hover:underline"
                      key={menuItem.id}
                    >
                      <Link href={menuItem.url}>{menuItem.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}

          {/* copyright content */}
          <div className="text-gray-500">
            Copyright &copy; {year} {siteData?.name}. All rights reserved.
          </div>
        </Wrapper>
      </footer>
    </>
  );
};

export default Footer;
