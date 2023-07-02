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
    <section>
      <PostSubHeading>Author</PostSubHeading>

      <div className=" p-[20px] flex gap-5  bg-gray-100">
        <div>
          <Link href={`/author/${author.slug}`}>
            <Image
              classes=" rounded-full h-[96px] w-[96px]"
              src={author.avatar_urls[96]}
              alt={author.name}
            />
          </Link>
        </div>
        <div className="flex-1 ">
          <Link href={`/author/${author.slug}`}>
            <span className="text-[28px] lg:text-[40px] oswald">
              {author.name}
            </span>
          </Link>
          <p className="text-24px] text-gray-500">{author.description}</p>
        </div>
      </div>
    </section>
  );
};

export default Author;
