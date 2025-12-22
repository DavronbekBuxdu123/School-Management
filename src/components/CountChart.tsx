"use client";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 100,
    fill: "white",
  },
  {
    name: "Girls",
    count: 50,
    fill: "#8884d8",
  },
  {
    name: "Boys",
    count: 50,
    fill: "#83a6ed",
  },
];

export const CountChart = ({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) => (
  <div className="h-[450px] bg-white rounded-xl px-4 py-2 flex flex-col  gap-4 ">
    {/* TOP */}
    <div className="flex items-center justify-between">
      <span className="text-lg font-semibold">Student</span>
      <Image src="/moreDark.png" alt="more" width={20} height={20} />
    </div>
    {/* MIDDLE */}
    <div className="relative w-full h-[75%]">
      <ResponsiveContainer>
        {" "}
        <RadialBarChart
          className=""
          innerRadius="40%"
          outerRadius="100%"
          cx="50%"
          cy="50%"
          data={data}
        >
          <RadialBar background dataKey="count" />
        </RadialBarChart>
      </ResponsiveContainer>

      <Image
        src="/maleFemale.png"
        alt="img"
        width={50}
        height={50}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
    {/* BOTTOM */}
    <div className="flex items-center gap-4 justify-between ">
      <div className="flex flex-col items-start gap-2">
        <div className="bg-[#8884d8] w-5 h-5 rounded-full"></div>
        <span className="text-lg font-semibold">1234</span>
        <span className="text-sm text-gray-400">Boys(50%)</span>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="bg-[#83a6ed] w-5 h-5 rounded-full"></div>
        <span className="text-lg font-semibold">1134</span>
        <span className="text-sm text-gray-400">Girls(50%)</span>
      </div>
    </div>
  </div>
);

export default CountChart;
