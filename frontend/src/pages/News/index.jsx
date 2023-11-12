import React from "react";
import { useNavigate } from "react-router-dom";
import { newsData } from "@/data";
import useCheckScreenSize from "@/hooks/useCheckScreenSize";

const News = () => {
  const navigate = useNavigate();
  const isTablet = useCheckScreenSize("tablet");

  return (
    <div className="max-w-2xl sm:max-w-full mx-auto p-4">
      {!isTablet ? (
        <div>
          <div className="flex items-center space-x-4 mb-10">
            <h1 className="text-3xl font-bold">Latest News</h1>
            <hr className="flex-grow h-[0.1rem] my-0 border-0 bg-black" />
          </div>
          <div>
            {newsData.map((news) => (
              <div id={news.id} className="relative mb-4">
                <div
                  className="news-item flex flex-col mb-6"
                  onClick={() => navigate(`/news/${news.id}`)}
                >
                  <img
                    src={news.image}
                    alt="news"
                    className="object-cover w-full h-64 rounded-[2rem]"
                  />
                </div>
                <div className="absolute bottom-5 left-5 flex w-[80%] flex-col space-y-1 z-40">
                  <p className="text-sm font-medium text-red-500 bg-opacity-50">
                    {news.date}
                  </p>
                  <h2 className="text-2xl font-bold text-white">
                    {news.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center space-x-4 mb-10 md:mt-28">
            <h1 className="text-3xl font-bold">Latest News</h1>
            <hr className="flex-grow h-[0.1rem] my-0 border-0 bg-black" />
          </div>
          <div className="flex space-x-4">
            {newsData.length > 0 && (
              <React.Fragment>
                <div id={newsData[0].id} className="relative mb-3 w-[80%]">
                  <div
                    className="news-item flex flex-col"
                    onClick={() => navigate(`/news/${newsData[0].id}`)}
                  >
                    <img
                      src={newsData[0].image}
                      alt="news"
                      className="object-cover w-full rounded-[2rem]"
                    />
                    <div className="flex w-[80%] absolute bottom-[5.5rem] left-4  flex-col  space-y-1 z-40 ">
                      <p className="text-sm font-medium text-red-500 bg-opacity-50 -mt-5">
                        {newsData[0].date}
                      </p>
                      <h2 className="text-2xl font-bold text-white">
                        {newsData[0].title}
                      </h2>
                    </div>
                  </div>
                </div>
                <div>
                  {newsData.slice(1).map((news) => (
                    <div key={news.id} className="relative mb-3">
                      <div
                        className="news-item flex flex-col"
                        onClick={() => navigate(`/news/${news.id}`)}
                      >
                        <img
                          src={news.image}
                          alt="news"
                          className="object-cover w-full h-72 rounded-[2rem]"
                        />
                      </div>
                      <div className="absolute bottom-5 left-4 flex w-[80%] flex-col space-y-1 z-40">
                        <p className="text-sm font-medium text-red-500 bg-opacity-50">
                          {news.date}
                        </p>
                        <h2 className="text-2xl font-bold text-white">
                          {news.title}
                        </h2>
                      </div>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default News;


