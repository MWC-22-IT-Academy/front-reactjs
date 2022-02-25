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
  const [selectedPeriod, setSelectedPeriod] = useState({
    year: "",
    month: "",
  });
  const [dynamicMonthlyData, setDynamicMonthlyData] = useState("");
  const [dynamicYearlyData, setDynamicYearlyData] = useState("");

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
        const [{ perrosAcogidosAvg, perrosAdoptadosAvg, gatosAcogidosAvg, gatosAdoptadosAvg }] = data;
        setLastDataAvailable([
          {
            type: "Perros acogidos",
            value: perrosAcogidosAvg,
          },
          {
            type: "Perros adoptados",
            value: perrosAdoptadosAvg,
          },
          { type: "Gatos acogidos", value: gatosAcogidosAvg },
          { type: "Gatos adoptados", value: gatosAdoptadosAvg },
        ]);
      });
  }, [lastYearAvailable]);

  const handlePeriodChange = e => {
    const { name, value } = e.target;
    setSelectedPeriod(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePeriodSubmit = e => {
    e.preventDefault();
    const { year, month } = selectedPeriod;
    const uri = `http://localhost:8000/fullData?year=${year}`;
    fetch(uri)
      .then(res => res.json())
      .then(data => {
        const partialData = data[0].monthlyData.find(item => item.month === month);
        setDynamicMonthlyData(partialData);
        setDynamicYearlyData(data[0].monthlyData);
      });
  };

  const renderLastData = () => {
    return lastDataAvailable.map((item, i) => <InfoLine key={i} description={item.type} infoText={item.value} />);
  };

  const renderMonthOptions = () => {
    const year = selectedPeriod.year;
    if (!year) {
      return;
    }
    const months = availableData.filter(item => item.year === year)[0].months;
    return months.map(item => ({
      value: item,
      text: item,
    }));
  };

  const renderDynamicMonthlyData = () => {
    const { perrosAcogidos, perrosAdoptados, gatosAcogidos, gatosAdoptados } = dynamicMonthlyData;
    return (
      <>
        <InfoLine description="Perros acogidos" infoText={perrosAcogidos} />
        <InfoLine description="Perros adoptados" infoText={perrosAdoptados} />
        <InfoLine description="Gatos acogidos" infoText={gatosAcogidos} />
        <InfoLine description="Gatos adoptados" infoText={gatosAdoptados} />
      </>
    );
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
        <SectionSubtitle text="Dynamic monthly data" />
        {availableData && (
          <form>
            <InputSelect
              name="year"
              id="year-select"
              labelText="Choose a year: "
              onChange={handlePeriodChange}
              value={selectedPeriod.year}
              selectOptions={availableData.map(item => ({
                value: item.year,
                text: item.year,
              }))}
            />
            <InputSelect
              name="month"
              id="month-select"
              labelText="Choose a month: "
              onChange={handlePeriodChange}
              value={selectedPeriod.month}
              selectOptions={renderMonthOptions()}
            />
            <button onClick={handlePeriodSubmit}>Get Data</button>
          </form>
        )}
        {dynamicMonthlyData && renderDynamicMonthlyData()}
        {dynamicYearlyData && (
          <>
            <SectionSubtitle text="Yearly adoption trends" />
            <GraphicChart data={dynamicYearlyData} />
          </>
        )}
      </section>
    </div>
  );
}

export default App;
