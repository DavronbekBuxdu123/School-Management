"use client";

import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    oy: "Yanvar",
    daromad: 4000,
    xarajat: 2400,
  },
  {
    oy: "Fevral",
    daromad: 3000,
    xarajat: 1398,
  },
  {
    oy: "Mart",
    daromad: 2000,
    xarajat: 9800,
  },
  {
    oy: "Aprel",
    daromad: 2780,
    xarajat: 3908,
  },
  {
    oy: "May",
    daromad: 1890,
    xarajat: 4800,
  },
  {
    oy: "Iyun",
    daromad: 2390,
    xarajat: 3800,
  },
  {
    oy: "Iyul",
    daromad: 3490,
    xarajat: 4300,
  },
  {
    oy: "Avgust",
    daromad: 3490,
    xarajat: 4300,
  },
  {
    oy: "Sentabr",
    daromad: 3490,
    xarajat: 4300,
  },
  {
    oy: "Oktabr",
    daromad: 3490,
    xarajat: 4300,
  },
  {
    oy: "Noyabr",
    daromad: 3490,
    xarajat: 4300,
  },
  {
    oy: "Dekabr",
    daromad: 3490,
    xarajat: 4300,
  },
];

const FinanceChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Moliyaviy diagramma</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="oy"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={20}
          />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="daromad"
            stroke="#C3EBFA"
            strokeWidth={5}
          />
          <Line
            type="monotone"
            dataKey="xarajat"
            stroke="#CFCEFF"
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
