import React from "react";

// Components
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
  layoutData?: any;
};

const Layout: React.FC<LayoutProps> = ({ children, layoutData }) => {
  const { siteData = {}, headerMenu = [], footerMenu = [] } = layoutData || {};

  return (
    <>
      <Header siteData={siteData} headerMenu={headerMenu} />
      <main className="mt-6 mb-9">{children}</main>
      <Footer siteData={siteData} footerMenu={footerMenu} />
    </>
  );
};

export default Layout;
