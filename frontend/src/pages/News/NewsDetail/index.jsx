import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { newsData } from "@/data";
import { NavigateBackButton } from "@/components/global/Buttons";
import useCheckScreenSize from "@/hooks/useCheckScreenSize";

const NewsDetail = () => {
  const { id } = useParams();
  const isTablet = useCheckScreenSize("tablet");
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    const item = newsData.find((news) => news.id.toString() === id);
    setNewsItem(item);
  }, [id]);

  if (!newsItem) return <div>Loading...</div>;

  return (
    <React.Fragment>
      {!isTablet ? (
        <React.Fragment>
          <NavigateBackButton top={1} left={1} />
          <img src={newsItem.image} alt="news" />
          <div className="bg-white drop-shadow-xl rounded-3xl px-10 py-10 -mt-16 text-start mx-6">
            <p className="text-sm font-medium text-red-500 mb-2">
              {newsItem.date}
            </p>
            <h2 className="text-2xl font-bold mb-2">{newsItem.title}</h2>
          </div>
          <div className="mx-4 py-10">
            <p className="text-sm text-gray-600 mb-2">{newsItem.content}</p>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <img src={newsItem.image} alt="news" />
          <div className="bg-white drop-shadow-xl rounded-3xl px-10 py-10 -mt-16 text-start mx-6">
            <p className="text-sm font-medium text-red-500 mb-2">
              {newsItem.date}
            </p>
            <h2 className="text-2xl font-bold mb-2">{newsItem.title}</h2>
          </div>
          <div className="mx-4 py-10">
            <p className="text-sm text-gray-600 mb-2">{newsItem.content}</p>
          </div>
          <NavigateBackButton useFixed useAnimation right={2} bottom={2} width={16} height={16} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default NewsDetail;
