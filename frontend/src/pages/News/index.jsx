import React from "react";
import { useNavigate } from "react-router-dom";
import { newsData } from "@/data";
import useCheckScreenSize from "@/hooks/useCheckScreenSize";

const News = () => {
  const navigate = useNavigate();
  const isTablet = useCheckScreenSize("tablet");

  return (
    <div className="max-w-2xl sm:max-w-full mx-auto p-4 bg-mainBackground">
      <React.Fragment>
        <div className="flex items-center space-x-4 mb-5 mt-6">
          <h1 className="text-[2.45rem] leading-normal font-bold text-black">
            Latest News
          </h1>
        </div>
        <div className="flex flex-col 
          md:flex-row md:space-x-5"
        >
          {newsData.length > 0 && (
            <React.Fragment>
              <div
                key={newsData[0].newsID}
                className="bg-white rounded-[3rem] pb-6 
                  md:min-w-[30rem] 
                "
                onClick={() => navigate(`/news/${newsData[0].newsID}`)}
              >
                <div className="flex flex-col">
                  <img
                    src={newsData[0].backgroundImage}
                    alt="news"
                    className="object-cover w-full rounded-[2rem]"
                  />
                </div>
                <div className="px-4 pt-3">
                  <h2 className="text-2xl font-bold text-black">
                    {newsData[0].title}
                  </h2>
                </div>
                <div className="flex justify-between items-center px-4 pt-4">
                  <div className="flex justify-start items-center">
                    <div className="w-14 h-14 rounded-full mr-4">
                      <img
                        src={newsData[0].author.profileImage}
                        alt="Profile image"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <p className="text-md font-semibold text-gray-500">
                      {newsData[0].author.name}
                    </p>
                  </div>
                  <div className="mr-3">
                    <p className="text-md font-semibold text-gray-500">
                      {newsData[0].date}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-7 mt-10 w-full flex flex-col justify-center bg-red-500 
                md:mt-0 md:justify-start
              ">
                {newsData.slice(1).map((news) => (
                  <div
                    key={news.newsID}
                    className="rounded-xl flex w-full justify-start items-center "
                    onClick={() => navigate(`/news/${news.newsID}`)}
                  >
                    <div className="w-24 h-[5rem] rounded-xl">
                      <img
                        src={newsData[0].backgroundImage}
                        alt="news"
                        className="object-cover w-full h-full rounded-[1rem]"
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-3 h-[5rem] w-full">
                      <h2 className="text-md font-semibold text-black">
                        {news.title}
                      </h2>
                      <div className="flex w-full justify-between text-gray-500 text-sm font-semibold">
                        <p>{news.date}</p>
                        <p>{news.author.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    </div>
  );
};

export default News;


