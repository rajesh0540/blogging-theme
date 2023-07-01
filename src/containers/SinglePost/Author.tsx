//
import Link from "next/link";
// Components
import Wrapper from "@/common/components/Wrapper";
import Image from "@/common/components/Image";
import PostSubHeading from "@/common/containers/PostSubHeading";

type AuthorProps = {
  post: any;
};

const Author: React.FC<AuthorProps> = ({ post }) => {
  const { author } = post;
  return (
    <>
      <Wrapper size="small" className=" mb-[90px]">
        <PostSubHeading>Author</PostSubHeading>

        <div className=" p-[20px] flex gap-5  bg-gray-100">
          <div>
            <Link href={`/author/${author.slug}`}>
              <Image
                classes=" rounded-full h-[96px] w-[96px]"
                src={author.avatar_urls[96]}
              />
            </Link>
          </div>
          <div className="flex-1 ">
            <Link href={`/author/${author.slug}`}>
              <h4 className="text-[28px] lg:text-[40px]">{author.name}</h4>
            </Link>
            <p className="text-24px] text-gray-500">{author.description}</p>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Author;
