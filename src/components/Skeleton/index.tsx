import React from "react";

interface SkeletonProps {
  count: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ count }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col bg-white border shadow-sm my-5 rounded-xl p-4 md:p-5"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="w-16 h-16 block bg-gray-200 rounded-full"></span>
            </div>

            <div className="ms-4 mt-2 w-[33%]">
              <h3 className="h-4 bg-gray-200 rounded-full"></h3>
              <h3 className="h-4 mt-3 bg-gray-200 rounded-full"></h3>
            </div>
          </div>
          <ul className="mt-5 space-y-3">
            <li className="w-full h-4 bg-gray-200 rounded-full"></li>
            <li className="w-full h-4 bg-gray-200 rounded-full"></li>
            <li className="w-full h-4 bg-gray-200 rounded-full"></li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default Skeleton;
