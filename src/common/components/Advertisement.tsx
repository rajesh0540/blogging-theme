import React from "react";

const Advertisement = () => {
  return (
    <>
      <div className="relative">
        <h5 className="uppercase  text-[11.2px] text-gray-500 text-center mb-1">
          Advertisement
        </h5>
        <img
          className="block"
          src="https://images.pexels.com/photos/3307862/pexels-photo-3307862.jpeg?cs=srgb&dl=pexels-the-lazy-artist-gallery-3307862.jpg&fm=jpg      "
        />
        <div className=" px-5  absolute top-6">
          <p className="uppercase">
            Start your media empire{" "}
            <span className="font-bold italic"> today </span>
          </p>
          <h2 className="font-extrabold text-5xl">zox</h2>
          <button className="bg-green-500 px-5 py-2 mt-3">Buy Now</button>
        </div>
      </div>
    </>
  );
};

export default Advertisement;
