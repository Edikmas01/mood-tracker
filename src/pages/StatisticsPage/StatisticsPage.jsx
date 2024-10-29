import "./StatisticsPage.scss"
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const StatisticsPage = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Получаем данные из LocalStorage
    const moodData = JSON.parse(localStorage.getItem("moodData")) || [];
    const formattedData = moodData.map((item) => ({
      date: item.date,
      moodLevel: item.moodLevel,
    }));
    setChartData(formattedData);
  }, []);

  return (
    <div className="statistics-container">
      <h2 className="statistics-title">Statistics</h2>
      <ResponsiveContainer width="100%" height={450}>
        <LineChart
          data={chartData}
          margin={{ top: 15, right: 5, left: -40, bottom: 1 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[1, 5]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="moodLevel"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
