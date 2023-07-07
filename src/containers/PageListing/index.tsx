import React from "react";

// Components
import Wrapper from "@/common/components/Wrapper";
import Link from "next/link";

type PageListingProps = {
  pages: any[];
};
const PageListing: React.FC<PageListingProps> = ({ pages }) => {
  return (
    <section>
      <Wrapper>
        <ul className="flex flex-col gap-2">
          {pages.map((page: any) => {
            return (
              <li>
                <Link
                  className="text-lg text-gray-600 hover:underline"
                  href={`/page/${page.slug}`}
                >
                  {page.title.rendered}
                </Link>
              </li>
            );
          })}
        </ul>
      </Wrapper>
    </section>
  );
};

export default PageListing;
