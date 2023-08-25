import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface DataPoint {
  name: string;
  cases: number;
  deaths: number;
  recovered: number;
}

interface CovidData {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

const covidData: CovidData = {
  cases: {
    "1/22/20": 557,
    "1/23/20": 657,
  },
  deaths: {
    "1/22/20": 17,
    "1/23/20": 18,
  },
  recovered: {
    "1/22/20": 30,
    "1/23/20": 38,
  }
};

const chartData: DataPoint[] = Object.keys(covidData.cases).map(date => ({
  name: date,
  cases: covidData.cases[date],
  deaths: covidData.deaths[date],
  recovered: covidData.recovered[date]
}));

const App: React.FC = () => {
  return (
    <ResponsiveContainer width="80%" height={400}>
      <LineChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="cases"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line yAxisId="right" type="monotone" dataKey="deaths" stroke="#82ca9d" />
        <Line yAxisId="right" type="monotone" dataKey="recovered" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default App;



