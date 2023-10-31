import React from "react";

const Insider = () => {

  // Mock image URLs
  const images = [
    "https://via.placeholder.com/300x400",
    "https://via.placeholder.com/300x500",
    "https://via.placeholder.com/300x300",
    "https://via.placeholder.com/300x450",
    "https://via.placeholder.com/300x350",
    "https://via.placeholder.com/300x480",
  ];

  return (
    <section className="flex flex-1 flex-col h-auto px-7 py-5 bg-gray-100">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Inside our Classroom</h1>
        <h2 className="text-2xl mt-2">
          Join the family of Software Engineering
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={img}
              alt="Classroom"
              className="w-full object-cover transition-transform transform hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Insider;
