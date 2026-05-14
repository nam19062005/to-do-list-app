import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen text-center">
      <img
        src="404_NotFound.png"
        alt="not found"
        className="max-w-full h-auto mb-6 w-96"
      ></img>
      <p className="text-xl font-bold">
        Đừng vào đây nữa, quay về trang chủ đi bạn ơi!
      </p>

      <a href="/" className="text-blue-500 hover:text-blue-700 transition-colors duration-300 mt-4 inline-block px-6 py-3 shadow-lg rounded-lg bg-blue-100 hover:bg-blue-200">
        Quay về trang chủ
      </a>
    </div>
  );
};
export default NotFound;
