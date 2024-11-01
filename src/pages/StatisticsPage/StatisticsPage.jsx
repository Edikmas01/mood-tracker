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
    const moodData = JSON.parse(localStorage.getItem("moodData")) || [];

    const formattedData = moodData.map((item) => ({
      date: item.date,
      moodLevel: item.moodLevel,
      moodName: item.name,
    }));
    setChartData(formattedData);
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { date, moodLevel, moodName } = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p>{`Date: ${date}`}</p>
          <p>{`Mood Level: ${moodLevel}`}</p>
          <p>{`Emotion: ${moodName || "No name available"}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="statistics-container">
      <h2 className="statistics-title">Statistics</h2>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={450}>
          <LineChart
            data={chartData}
            margin={{ top: 15, right: 5, left: -40, bottom: 1 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datt" />
            <YAxis domain={[1, 5]} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="moodLevel"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <h3 className="no-data-message">No data available for statistics.</h3>
      )}
    </div>
  );
};
