import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./LineBarChart.css";

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

function LineBarChart({ expenses, categories }) {
  const data = processDataForPieChart(expenses);

  return (
    <>
      <h2 className="top-expenses-heading">Top Expenses</h2>
      <div className="line-bar-chart">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{left: 50, bottom: 20 }}
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip cursor={{ fill: "transparent" }} />
            <Bar
              dataKey="value"
              barSize={20}
              radius={[0, 10, 10, 0]}
              fill="#8884d8"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default LineBarChart;
