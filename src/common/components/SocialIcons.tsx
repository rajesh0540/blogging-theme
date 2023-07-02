import React from "react";

//
import {
  Facebook,
  Twitter,
  WhatsApp,
  LinkedIn,
} from "@/common/components/Icon";

type SocialIconsProps = {
  title: string;
  url: string;
};

const SocialIcons: React.FC<SocialIconsProps> = ({ title, url }) => {
  // prettier-ignore
  const shareIcons = [
    {
      id: "facebook",
      icon: <Facebook size={26} color="#4267B2" />,
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      id: "twitter",
      icon: <Twitter size={20} color="#1DA1F2" />,
      link: `https://twitter.com/share?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      id: "whatsapp",
      icon: <WhatsApp size={24} color="#25D366" />,
      link: `whatsapp://send?text=${encodeURIComponent(title)} ${encodeURIComponent(url)}`
    },
    {
      id: "linkedin",
      icon: <LinkedIn size={18} color="#0072b1" />,
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
    },
  ];

  return (
    <ul className="flex gap-2">
      {shareIcons.map(({ id, icon, link }) => (
        <li>
          <a
            href={link}
            aria-label={`Share on ${id}`}
            onClick={(e) => {
              e.preventDefault();

              window.open(
                e.currentTarget.href,
                `share-${id}`,
                "width=650, height=550"
              );

              return false;
            }}
          >
            <button
              className="flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-300 w-9 h-9"
              aria-label={`Share on ${id}`}
            >
              {icon}
            </button>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialIcons;
