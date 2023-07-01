import React from "react";

// Components
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
  layoutData?: any;
};

const Layout: React.FC<LayoutProps> = ({ children, layoutData }) => {
  const { categories } = layoutData || {};

  return (
    <>
      <Header categories={categories} />
      <main className="my-12">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
