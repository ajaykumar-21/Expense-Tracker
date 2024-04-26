import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const processDataForPieChart = (expenses) => {
  const categories = {};

  expenses.forEach((item) => {
    if (categories[item.category]) {
      categories[item.category] += parseInt(item.price);
    } else {
      categories[item.category] = parseInt(item.price);
    }
  });

  return Object.keys(categories).map((category) => ({
    name: category,
    value: categories[category],
  }));
};

function RoundChart({ expenses }) {
  const data = processDataForPieChart(expenses);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default RoundChart;
