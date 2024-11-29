// ExpensesBreakdown.js
import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Rental Cost", value: 30675 },
  { name: "Wages", value: 22675 },
  { name: "Launch", value: 16000 },
  { name: "Electricity", value: 10000 },
  { name: "Medical", value: 4000 },
  { name: "Others", value: 2025 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF8042",
  "#FF8042",
];

const ExpensesBreakdown = () => (
  <PieChart width={400} height={400}>
    <Pie
      data={data}
      cx={200}
      cy={200}
      outerRadius={80}
      fill="#8884d8"
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
);

export default ExpensesBreakdown;
