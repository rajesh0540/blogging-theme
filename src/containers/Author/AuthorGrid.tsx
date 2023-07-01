import React from "react";

// Components
import AuthCard from "@/containers/Author/AuthorCard";
import Wrapper from "@/common/components/Wrapper";

const data = [
  {
    img: "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
    name: " Author Name",
    teaserLink: [
      { link: " How to Use Virtual Hiring to Find a Top-Notch Candidate?" },
      { link: "How to Use Virtual Hiring to Find a Top-Notch Candidate?" },
    ],
  },
  {
    img: "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
    name: " Author Name",
    content:
      "Emma Catherine grew up on the beautiful Southern California coast She loves surfing, writing, and hanging out with her adorable dog,enry. Her debut YA Contemporary, Love Letters, comes July 2017.",

    teaserLink: [
      { link: " How to Use Virtual Hiring to Find a Top-Notch Candidate?" },
      { link: "How to Use Virtual Hiring to Find a Top-Notch Candidate?" },
    ],
  },

  {
    img: "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
    name: " Author Name",
    content:
      "Emma Catherine grew up on the beautiful Southern California coast She loves surfing, writing, and hanging out with her adorable dog,enry. Her debut YA Contemporary, Love Letters, comes July 2017.",

    teaserLink: [
      { link: " How to Use Virtual Hiring to Find a Top-Notch Candidate?" },
      { link: "How to Use Virtual Hiring to Find a Top-Notch Candidate?" },
    ],
  },

  {
    img: "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
    name: " Author Name",
    content:
      "Emma Catherine grew up on the beautiful Southern California coast She loves surfing, writing, and hanging out with her adorable dog,enry. Her debut YA Contemporary, Love Letters, comes July 2017.",

    teaserLink: [
      { link: " How to Use Virtual Hiring to Find a Top-Notch Candidate?" },
      { link: "How to Use Virtual Hiring to Find a Top-Notch Candidate?" },
    ],
  },

  {
    img: "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
    name: " Author Name",

    teaserLink: [
      { link: " How to Use Virtual Hiring to Find a Top-Notch Candidate?" },
      { link: "How to Use Virtual Hiring to Find a Top-Notch Candidate?" },
    ],
  },

  {
    img: "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
    name: " Author Name",
    content:
      "Emma Catherine grew up on the beautiful Southern California coast She loves surfing, writing, and hanging out with her adorable dog,enry. Her debut YA Contemporary, Love Letters, comes July 2017.",

    teaserLink: [
      { link: " How to Use Virtual Hiring to Find a Top-Notch Candidate?" },
      { link: "How to Use Virtual Hiring to Find a Top-Notch Candidate?" },
    ],
  },

  {
    img: "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
    name: " Author Name",

    teaserLink: [
      { link: " How to Use Virtual Hiring to Find a Top-Notch Candidate?" },
      { link: "How to Use Virtual Hiring to Find a Top-Notch Candidate?" },
    ],
  },

  {
    img: "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
    name: " Author Name",
    content:
      "Emma Catherine grew up on the beautiful Southern California coast She loves surfing, writing, and hanging out with her adorable dog,enry. Her debut YA Contemporary, Love Letters, comes July 2017.",

    teaserLink: [
      { link: " How to Use Virtual Hiring to Find a Top-Notch Candidate?" },
      { link: "How to Use Virtual Hiring to Find a Top-Notch Candidate?" },
    ],
  },

  {
    img: "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
    name: " Author Name",
    content:
      "Emma Catherine grew up on the beautiful Southern California coast She loves surfing, writing, and hanging out with her adorable dog,enry. Her debut YA Contemporary, Love Letters, comes July 2017.",

    teaserLink: [
      { link: " How to Use Virtual Hiring to Find a Top-Notch Candidate?" },
      { link: "How to Use Virtual Hiring to Find a Top-Notch Candidate?" },
    ],
  },
];

const AuthorGrid = () => {
  return (
    <>
      <Wrapper>
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <AuthCard
              name={item.name}
              img={item.img}
              content={item.content}
              link={item.teaserLink}
            />
          ))}
        </section>
      </Wrapper>
    </>
  );
};

export default AuthorGrid;
