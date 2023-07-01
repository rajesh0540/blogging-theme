import React from "react";

//
import Link from "next/link";

// Components
import Wrapper from "../../common/components/Wrapper";
import Image from "../../common/components/Image";

interface AuthorProps {
  img: string;
  name: string;
  content?: string;
  link: any[];
}

const AuthCard: React.FC<AuthorProps> = ({ img, name, content, link }) => {
  return (
    <div className="bg-gray-100 p-[32px] ">
      <Wrapper>
        <div className="mb-[8px]">
          <Image classes=" rounded-full h-[96px] w-[96px] " src={img} />
        </div>
        <Link href="/">
          <h3 className="text-[20px]  hover:underline font-semibold">{name}</h3>
        </Link>

        <div>
          {content ? (
            <p className="text-[16px] text-gray-500 mt-[8px]  mb-[20px] text-ellipsis">
              {content}
            </p>
          ) : (
            <p className="text-[16px] text-gray-500  pb-[20px] text-ellipsis">
              {content}
            </p>
          )}
        </div>

        <div className=" border-t text-[16px] border-gray-300 pt-[20px]">
          {link?.map((item) => (
            <div className="flex gap-2">
              <div className="h-[1px] w-4 bg-gray-700 mt-3"></div>
              <Link href="/">
                <h3 className="mb-4 hover:underline ">{item.link}</h3>
              </Link>
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default AuthCard;
