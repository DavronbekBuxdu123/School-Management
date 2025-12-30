"use client";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { kun: "Du", qatnashdi: 60, qatnashmadi: 40 },
  { kun: "Se", qatnashdi: 70, qatnashmadi: 60 },
  { kun: "Ch", qatnashdi: 90, qatnashmadi: 75 },
  { kun: "Pa", qatnashdi: 90, qatnashmadi: 75 },
  { kun: "Ju", qatnashdi: 65, qatnashmadi: 55 },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Davomat</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="kun"
            axisLine={false}
            tick={{ fill: "#44a2fa" }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
          <Bar
            dataKey="qatnashdi"
            fill="#44a2fa"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="qatnashmadi"
            fill="#22C55E"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
