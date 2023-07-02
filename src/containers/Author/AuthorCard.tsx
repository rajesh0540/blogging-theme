import React from "react";

//
import Link from "next/link";

// Components
import Wrapper from "../../common/components/Wrapper";
import Image from "../../common/components/Image";

interface AuthorProps {
  authors: any;
}

const AuthCard: React.FC<AuthorProps> = ({ authors }) => {
  const { avatar_urls, description, name, slug } = authors;

  return (
    <div className="bg-gray-100 p-[20px] ">
      <Wrapper>
        <div className="mb-[8px] ">
          <Link href={`/author/${slug}`} aria-label={`Posts by ${name}`}>
            <Image
              classes="rounded-full h-[96px] w-[96px]"
              src={avatar_urls[96]}
              alt={name}
            />
          </Link>
        </div>
        <div className="pb-2 ">
          <Link href={`/author/${slug}`}>
            <h3 className="text-[20px]  hover:underline font-semibold">
              {name}
            </h3>
          </Link>
        </div>

        {/* <div className="h"></div> */}
        <div>
          <p className="text-[16px] text-gray-500 mt-[8px] border-t border-gray-300 pt-3  mb-[20px] text-ellipsis">
            {description}
          </p>
        </div>
      </Wrapper>
    </div>
  );
};

export default AuthCard;
