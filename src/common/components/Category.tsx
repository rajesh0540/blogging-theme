import React from "react";
import Link from "next/link";

import { getTimePassed } from "@/utils/functions/date";

interface CategoryProps {
  category: any;
  postedDate: string;
  variant?: "gray" | "primary" | "primary-dark";
}

const Category: React.FC<CategoryProps> = ({
  category,
  postedDate,
  variant = "gray",
}) => {
  const { name, slug } = category || {};

  const categoryClasses = {
    gray: "text-gray-500",
    primary: "text-primary",
    "primary-dark": "text-primary",
  };
  const dateClasses = {
    gray: "text-gray-500",
    primary: "text-gray-200",
    "primary-dark": "text-gray-400",
  };

  const timePassed = getTimePassed(postedDate);

  return (
    <div className="text-xs">
      {name && (
        <>
          <Link href={`/category/${slug}`}>
            <span className={`font-bold uppercase ${categoryClasses[variant]}`}>
              {name}
            </span>
          </Link>
          <span className={`mx-[5px] ${dateClasses[variant]}`}>/</span>
        </>
      )}

      <span className={`${dateClasses[variant]}`}>{timePassed}</span>
    </div>
  );
};

export default Category;
