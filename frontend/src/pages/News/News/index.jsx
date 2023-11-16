import React from "react";
import { useNavigate } from "react-router-dom";
import { newsData } from "@/data";

const News = () => {
  const navigate = useNavigate();

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
          {newsData.length > 0 && (
            <React.Fragment>
              <div
                key={newsData[0].newsID}
                className="bg-white rounded-[3rem] pb-6 
                  md:min-w-[25rem] 
                "
                onClick={() => navigate(`/news/${newsData[0].newsID}`)}
              >
                <div
                  className="flex flex-col 
                  md:min-w-[25rem] 
                "
                >
                  <img
                    src={newsData[0].backgroundImage}
                    alt="news"
                    className="object-cover w-full rounded-[2rem]"
                  />
                </div>
                <div className="px-4 pt-3">
                  <h2
                    className="text-2xl font-bold text-black
                    lg:text-3xl
                    "
                  >
                    {newsData[0].title}
                  </h2>
                </div>
                <div className="flex justify-between items-center px-4 pt-4">
                  <div className="flex justify-start items-center">
                    <div className="w-14 h-14 rounded-full mr-4">
                      {/* <img
                        src={newsData[0].author.profileImage}
                        alt="Profile image"
                        className="w-full h-full object-cover rounded-full"
                      /> */}
                    </div>
                    <p className="text-md font-semibold text-gray-500">
                      {newsData[0].author}
                    </p>
                  </div>
                  <div className="mr-3">
                    <p className="text-md font-semibold text-gray-500">
                      {newsData[0].date}
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
                {newsData.slice(1).map((news) => (
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
                        src={newsData[0].backgroundImage}
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
          )}
        </div>
      </React.Fragment>
    </div>
  );
};

export default News;
