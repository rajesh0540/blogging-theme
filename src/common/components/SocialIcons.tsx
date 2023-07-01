import React from "react";

//
import {
  Facebook,
  Twitter,
  WhatsApp,
  LinkedIn,
  Instagram,
} from "@/common/components/Icon";

const shareIcons = [
  <Facebook size={26} color="#4267B2" />,
  <Twitter size={20} color="#1DA1F2" />,
  <WhatsApp size={24} color="#25D366" />,
  <LinkedIn size={18} color="#0072b1" />,
  <Instagram size={22} />,
];

const SocialIcons = () => {
  return (
    <ul className="flex gap-2">
      {shareIcons.map((icon) => (
        <li>
          <button className="flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-300 w-9 h-9">
            {icon}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SocialIcons;
