import React from "react";

function NewsComponent() {
  return (
    <div className=" mt-4 bg-white p-4  rounded-lg">
      <div className="flex items-center justify-between ">
        <h1 className="text-md font-semibold ">News School</h1>
        <p className="text-gray-500 text-sm">View all</p>
      </div>
      <div className="border bg-orange-200 rounded-lg px-3 py-2 mt-2 ">
        <div className="flex items-center justify-between">
          <p>Lorem ipsum dolor sit amet.</p>
          <div className="bg-white rounded-lg px-2 ">
            {" "}
            <p className="text-sm ">2025-03-11</p>
          </div>
        </div>
        <p className="text-gray-500 mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, ea?
        </p>
      </div>
      <div className="border bg-orange-200 rounded-lg px-3 py-2 mt-2 ">
        <div className="flex items-center justify-between">
          <p>Lorem ipsum dolor sit amet.</p>
          <div className="bg-white rounded-lg px-2 ">
            {" "}
            <p className="text-sm">2025-03-11</p>
          </div>
        </div>
        <p className="text-gray-500 mt-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda,
          libero?
        </p>
      </div>
      <div className="border bg-orange-200 rounded-lg px-3 py-2 mt-2 ">
        <div className="flex items-center justify-between">
          <p>Lorem ipsum dolor sit amet.</p>
          <div className="bg-white rounded-lg px-2 ">
            <p className="text-sm">2025-03-11</p>
          </div>
        </div>
        <p className="text-gray-500 mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
          quas.
        </p>
      </div>
    </div>
  );
}

export default NewsComponent;
