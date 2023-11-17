import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavigateBackButton } from "@/components/global/Buttons";
import useCheckScreenSize from "@/hooks/useCheckScreenSize";
import news from "@/lib/api/news.js";

const NewsDetail = () => {
  const { ID } = useParams();

  const [newsData, setNewsData] = useState(null);
  console.log(ID);

  const isTablet = useCheckScreenSize("tablet");

  const getNewsByID = async () => {
    try {
      const response = await news.getNewsByID(ID);
      console.log(response);

      setNewsData(response);

    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    getNewsByID();
  }, []);


  useEffect(() => {
    console.log("Updated News Data:", newsData);
  }, [newsData]);

  if (!newsData) return <div>Loading...</div>;

  return (
    <React.Fragment>
      {!isTablet ? (
        <React.Fragment>
          <NavigateBackButton top={1} left={1} />
          <img
            src={`http://localhost:8000/${newsData.backgroundImage.replace(
              /\\/g,
              "/"
            )}`}
            alt="news"
          />
          <div className="bg-white drop-shadow-xl rounded-3xl px-10 py-10 -mt-16 text-start mx-6">
            <p className="text-sm font-medium text-red-500 mb-2">
              {newsData.date}
            </p>
            <h2 className="text-2xl font-bold mb-2">{newsData.title}</h2>
            <div className="flex items-center justify-end">
              <p className="text-sm font-semibold text-gray-500">
                {newsData.author}
              </p>
            </div>
          </div>
          <div className="mx-4 py-10">
            <p className="text-sm text-gray-600 mb-2">{newsData.content}</p>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <NavigateBackButton
            useAnimation
            top={1}
            left={1}
            width={16}
            height={16}
          />
          <div className="flex h-[20rem]">
            <img
              src={`http://localhost:8000/${newsData.backgroundImage.replace(
                /\\/g,
                "/"
              )}`}
              alt="news"
              className="object-cover w-full h-full"
            />
          </div>
          <div
            className="bg-white drop-shadow-xl rounded-3xl px-10 py-10 -mt-16 text-start mx-6
            md:mx-16
            lg:mx-48
          "
          >
            <p className="text-sm font-medium text-red-500 mb-2">
              {newsData.date}
            </p>
            <h2 className="text-2xl font-bold mb-2">{newsData.title}</h2>
          </div>
          <div
            className="mx-4 py-10 
            md:mx-14
            lg:mx-32
          "
          >
            <p className="text-sm text-gray-600 mb-2">{newsData.content}</p>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default NewsDetail;
