import React from "react";
import dynamic from "next/dynamic";

// Components
import type { WebStoriesProps } from "./Component";
import Loading from "./Loading";

const DynamicWebStories = dynamic(() => import("./Component"), {
  loading: Loading,
  ssr: false,
});

const WebStories: React.FC<WebStoriesProps> = (props) => {
  return <DynamicWebStories {...props} />;
};

export default WebStories;
