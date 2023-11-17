import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import news from "@/lib/api/news.js";
import { useQuery, useQueryClient } from "react-query";

const News = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: newsData,
    isError,
    error,
    isFetching,
  } = useQuery("allNews", news.getAllNews);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching news:", error);
    }
  }, [isError, error]);

  const refetchNews = () => {
    queryClient.invalidateQueries("allNews");
  };

  useEffect(() => {
    refetchNews();
  }, []); 
  
  return (
    <div className="max-w-2xl sm:max-w-full mx-auto p-4 pb-20 bg-mainBackground">
      <React.Fragment>
        <div className="flex items-center space-x-4 mb-5 mt-6">
          <h1 className="text-[2.45rem] leading-normal font-bold text-black">
            Latest News
          </h1>
        </div>
        <div
          className="flex flex-col 
          md:flex-row md:space-x-5"
        >
          {newsData && newsData.length > 0 ? (
            <React.Fragment>
              <div
                key={newsData[newsData.length - 1].newsID}
                className="bg-white rounded-[3rem] pb-6 
                  md:min-w-[25rem] md:max-h-[24rem]
                "
                onClick={() =>
                  navigate(`/news/${newsData[newsData.length - 1].newsID}`)
                }
              >
                <div
                  className="flex flex-col 
                  h-[16rem]
                  md:min-w-[25rem]
                "
                >
                  <img
                    src={`http://localhost:8000/${newsData[
                      newsData.length - 1
                    ].backgroundImage.replace(/\\/g, "/")}`}
                    alt="news"
                    className="object-cover w-full h-full rounded-[2rem]"
                  />
                </div>
                <div className="px-4 pt-3">
                  <h2
                    className="text-2xl font-bold text-black
                    lg:text-3xl
                    "
                  >
                    {newsData[newsData.length - 1].title}
                  </h2>
                </div>
                <div className="flex justify-between items-center px-4 pt-4 md:pb-4  md:bg-white md:rounded-b-[3rem]">
                  <div className="flex justify-start items-center">
                    <div className="w-14 h-14 rounded-full mr-4">
                      <img
                        src={`http://localhost:8000/${newsData[
                          newsData.length - 1
                        ].profileImage.replace(/\\/g, "/")}`}
                        alt="Profile image"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <p className="text-md font-semibold text-gray-500">
                      {newsData[newsData.length - 1].author}
                    </p>
                  </div>
                  <div className="mr-3">
                    <p className="text-sm font-semibold text-gray-500">
                      {newsData[newsData.length - 1].date}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="space-y-7 mt-10 w-full flex flex-col justify-center 
                md:mt-0 md:justify-start md:w-[200%] 
                lg:w-[130%] 
              "
              >
                {newsData.slice(0, -1).map((news) => (
                  <div
                    key={news.newsID}
                    className="rounded-xl flex w-full justify-start items-center 
                    lg:flex-col lg:bg-white lg:rounded-[3rem]
                    xl:min-h-[20rem]
                    "
                    onClick={() => navigate(`/news/${news.newsID}`)}
                  >
                    <div
                      className="w-24 h-[5rem] rounded-xl
                        md:min-w-[7rem] md:min-h-[6rem]
                        lg:w-full lg:min-h-[13rem] 

                    "
                    >
                      <img
                        src={`http://localhost:8000/${news.backgroundImage.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt="news"
                        className="object-cover w-full h-full rounded-[1rem]
                          lg:rounded-[3rem]
                        "
                      />
                    </div>
                    <div
                      className="flex flex-col justify-between ml-3 h-[5rem] w-full
                      md:h-full
                      lg:px-4 lg:py-2 lg:pb-7
                      xl:px-10 xl:py-10
                    "
                    >
                      <h2
                        className="text-md font-semibold text-black
                        md:text-xl
                        lg:text-2xl
                      "
                      >
                        {news.title}
                      </h2>
                      <div
                        className="flex w-full justify-between text-gray-500 text-sm font-semibold
                        lg:text-md
                      "
                      >
                        <p>{news.date}</p>
                        <p className="lg:mr-3">{news.author}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ) : isFetching ? 
            (
              <p>Loading...</p>
            ) : (
              <p>No news available</p>
            )
          }
        </div>
      </React.Fragment>
    </div>
  );
};

export default News;
