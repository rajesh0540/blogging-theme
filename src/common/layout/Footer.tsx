import React, { useMemo } from "react";

import Link from "next/link";

// Components
import Wrapper from "../components/Wrapper";

type FooterProps = {
  siteData?: any;
};

const Footer: React.FC<FooterProps> = ({ siteData }) => {
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
                src={siteData.site_logo.src}
                alt="Site Logo"
              />
            </div>
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
