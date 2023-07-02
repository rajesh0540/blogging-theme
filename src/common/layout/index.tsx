import React from "react";

// Components
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
  layoutData?: any;
};

const Layout: React.FC<LayoutProps> = ({ children, layoutData }) => {
  const { categories = [], siteData = {} } = layoutData || {};

  return (
    <>
      <Header categories={categories} siteData={siteData} />
      <main className="mt-6 mb-9">{children}</main>
      <Footer siteData={siteData} />
    </>
  );
};

export default Layout;
