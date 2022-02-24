import { useState, useEffect } from "react";
import "./App.css";
import GraphicChart from "./GraphicChart";
import InfoLine from "./InfoLine";
import SectionTitle from "./SectionTitle";
import SectionSubtitle from "./SectionSubtitle";
import InputSelect from "./InputSelect";

function App() {
  const [lastYearAvailable, setLastYearAvailable] = useState("");
  const [lastDataAvailable, setLastDataAvailable] = useState("");
  const [availableData, setAvailableData] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/lastFullYearAvailable/1")
      .then(res => res.json())
      .then(data => setLastYearAvailable(data.year));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/availableData")
      .then(res => res.json())
      .then(data => setAvailableData(data));
  }, []);

  useEffect(() => {
    const uri = `http://localhost:8000/fullData?year=2021`;
    fetch(uri)
      .then(res => res.json())
      .then(data => {
        const [
          {
            monthlyData: { perros, gatos },
          },
        ] = data;
        setLastDataAvailable([
          {
            type: "Perros acogidos",
            value: perros.acogidosAvg,
          },
          {
            type: "Perros adoptados",
            value: perros.adoptadosAvg,
          },
          { type: "Gatos acogidos", value: gatos.acogidosAvg },
          { type: "Gatos adoptados", value: gatos.adoptadosAvg },
        ]);
      });
  }, [lastYearAvailable]);

  const renderLastData = () => {
    return lastDataAvailable.map((item, i) => <InfoLine key={i} description={item.type} infoText={item.value} />);
  };

  return (
    <div className="App">
      <section>
        <SectionTitle text="Last data available" />
        <hr />
        <SectionSubtitle text="Monthly average data" />
        <InfoLine description="Full year" infoText={lastYearAvailable} className="section__subtitle" />
        {lastDataAvailable && renderLastData()}
        <hr />
      </section>
      <section>
        <SectionTitle text="Get data" />
        {availableData && (
          <InputSelect
            name="years"
            id="year-select"
            labelText="Choose a year: "
            selectValues={availableData.map(item => ({
              value: item.year,
              text: item.year,
            }))}
          />
        )}
      </section>
      <GraphicChart />
    </div>
  );
}

export default App;
