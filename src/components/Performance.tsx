"use client";
import Image from "next/image";
import React from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
const data = [
  { name: "Group A", value: 90, fill: "#3e9cf9" },
  { name: "Group B", value: 10, fill: "#9a4acf" },
];

function Performance() {
  return (
    <div className="bg-white p-4 rounded-lg h-80 relative ">
      <div className="flex items-center justify-between">
        <h1 className="text-md font-semibold">Samaradorlik</h1>
        <Image src="/moreDark.png" alt="more" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            fill="#8884d8"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-3xl font-bold">9.2</h1>
        <p className="text-xs text-gray-300"> 10 balldan </p>
      </div>
      <div className="w-full absolute bottom-0 mb-4 text-center mt-4 text-md font-semibold">
        1-semestr – 2-semestr
      </div>
    </div>
  );
}

export default Performance;
