import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { newsData } from "@/data";
import { NavigateBackButton } from "@/components/global/Buttons";
import useCheckScreenSize from "@/hooks/useCheckScreenSize";

const NewsDetail = () => {
  const { ID } = useParams();
  console.log(ID);
  const isTablet = useCheckScreenSize("tablet");
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    const item = newsData.find((news) => news.newsID.toString() === ID);
    setNewsItem(item);
    console.log(item);
  }, [ID]);


  if (!newsItem) return <div>Loading...</div>;

  return (
    <React.Fragment>
      {!isTablet ? (
        <React.Fragment>
          <NavigateBackButton top={1} left={1} />
          <img src={newsItem.backgroundImage} alt="news" />
          <div className="bg-white drop-shadow-xl rounded-3xl px-10 py-10 -mt-16 text-start mx-6">
            <p className="text-sm font-medium text-red-500 mb-2">
              {newsItem.date}
            </p>
            <h2 className="text-2xl font-bold mb-2">{newsItem.title}</h2>
            <div className="flex items-center justify-end">
              <p className="text-sm font-semibold text-gray-500">
                {newsItem.author}
              </p>
            </div>
          </div>
          <div className="mx-4 py-10">
            <p className="text-sm text-gray-600 mb-2">{newsItem.content}</p>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <NavigateBackButton
            useFixed
            useAnimation
            top={1}
            left={1}
            width={16}
            height={16}
          />
          <div className="flex h-[20rem]">
            <img
              src={newsItem.backgroundImage}
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
              {newsItem.date}
            </p>
            <h2 className="text-2xl font-bold mb-2">{newsItem.title}</h2>
          </div>
          <div className="mx-4 py-10 
            md:mx-14
            lg:mx-32
          "
          >
            <p className="text-sm text-gray-600 mb-2">{newsItem.content}</p>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default NewsDetail;
