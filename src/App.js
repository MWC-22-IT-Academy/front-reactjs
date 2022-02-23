import { data } from "./data-perros-gatos";
import "./App.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function App() {
  return (
    <div className="App">
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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="perros adoptados" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="gatos adoptados" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}

export default App;
