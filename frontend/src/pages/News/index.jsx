import React from "react";
import { newsData } from "@/data";

const News = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center space-x-4 mb-10">
        <h1 className="text-3xl font-bold ">Latest News</h1>
        <hr className="flex-grow h-[0.1rem] my-0 border-0 bg-black" />
      </div>

      <div>
        {newsData.map((news) => (
          <div className="flex flex-col mb-6">
            <img
              src={news.image}
              alt="news"
              className="object-cover w-full h-64 mb-4 rounded-[2rem]"
            />
            <p className="text-sm font-medium text-red-500 mb-2">{news.date}</p>
            <h2 className="text-2xl font-bold mb-2">{news.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{news.content}</p>
          </div>
        ))}
      </div>

      {/* <div className="flex justify-between items-center">
        {newsData.map(
          (news) =>
            news.id === 1 && (
              <div className="flex flex-col mb-6">
                <img
                  src={news.image}
                  alt="news"
                  className="object-cover w-full h-64 mb-4 rounded-[2rem]"
                />
                <p className="text-sm font-medium text-red-500 mb-2">
                  {news.date}
                </p>
                <h2 className="text-2xl font-bold mb-2">{news.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{news.content}</p>
              </div>
            )
        )}
        <div className="flex flex-col justify-center items-center">
          {newsData.map(
            (news) =>
              news.id !== 1 && (
                <div className="flex flex-col mb-6">
                  <img
                    src={news.image}
                    alt="news"
                    className="object-cover w-full h-64 mb-4 rounded-[2rem]"
                  />
                  <p className="text-sm font-medium text-red-500 mb-2">
                    {news.date}
                  </p>
                  <h2 className="text-2xl font-bold mb-2">{news.title}</h2>
                  <p className="text-sm text-gray-500 mb-2">{news.content}</p>
                </div>
              )
          )}
        </div>
      </div> */}
    </div>
  );
};

export default News;
