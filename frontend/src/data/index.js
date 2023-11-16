import {
  News1,
  News2,
  News3
} from "@/assets/images/News";

export const newsData = [
  {
    newsID: 1,
    title: "Software Engineering Skill Mapping Workshop",
    backgroundImage: News1,
    images: [
      {
        id: 1,
        image: News1,
      },
      {
        id: 2,
        image: News2,
      },
      {
        id: 3,
        image: News3,
      },
    ],
    content:
      "Software engineering (SE) is an engineering discipline concerning all aspects of software production, including software analysis, design, development, testing, and deployment. SE requires profound abstract and logical thinking and the application of mathematics, logic, and computer science in order to produce efficient and reliable software with the available resources.",
    date: "31/1/2023",
    author: {
      name: "Dr. Van Halen",
      profileImage: News1,
    }
  },
  {
    newsID: 2,
    title: "Software Engineering Skill Mapping Workshop",
    backgroundImage: News2,
    images: [
      {
        id: 1,
        image: News1,
      },
      {
        id: 2,
        image: News2,
      },
      {
        id: 3,
        image: News3,
      },
    ],
    content:
      "Software engineers, software architects, and software developers on various platforms, including enterprise software, web applications, mobile applications, games, embedded applications, etc.",
    date: "31/1/2023",
    author: {
      name: "Dr. Van Gogh",
      profileImage: News2,
    }
  },
  {
    newsID: 3,
    title: "Software Engineering Skill Mapping Workshop",
    backgroundImage: News3,
    images: [
      {
        id: 1,
        image: News1,
      },
      {
        id: 2,
        image: News2,
      },
      {
        id: 3,
        image: News3,
      },
    ],
    content:
      "Software engineering (SE) is an engineering discipline concerning all aspects of software production, including software analysis, design, development, testing, and deployment. SE requires profound abstract and logical thinking and the application of mathematics, logic, and computer science in order to produce efficient and reliable software with the available resources.",
    date: "31/1/2023",
    author: {
      name: "Dr. Van Halen",
      profileImage: News3,
    }
  },
];
