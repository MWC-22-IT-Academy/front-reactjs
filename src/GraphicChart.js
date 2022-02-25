//import { data } from "./data-perros-gatos";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function GraphicChart({ data }) {
  return (
    <div>
      <LineChart
        width={1300}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="perrosAdoptados" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="gatosAdoptados" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}

export default GraphicChart;
