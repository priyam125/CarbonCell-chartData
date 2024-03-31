import React, { useEffect, useState } from "react";
import axios from "axios";
import BarChart from "./components/BarChart";

function App() {
  const [populationData, setPopulationData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const getPopulationData = async () => {
    try {
      const response = await axios.get(
        "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
      );
      console.log(response.data);
      const formattedData = response.data.data.map((item) => ({
        nation: item.Nation,
        population: item.Population,
      }));
      console.log(formattedData);
      setPopulationData(formattedData);
    } catch (error) {
      console.error("Error fetching population data:", error);
    }
  };

  useEffect(() => {
    getPopulationData();
  }, []);

  useEffect(() => {
    setChartData({
      labels: populationData?.map((data) => data.nation),
      datasets: [
        {
          label: "Population",
          data: populationData.map((data) => data.population),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [populationData]);

  return (
    <div className="bg-slate-950 text-white flex min-h-screen flex-col items-center justify-center px-4 md:px-8 xl:px-10">
      <div className="w-4/5 flex flex-col items-center justify-center p-4 border border-slate-900 bg-slate-900/50 rounded-xl h-[500px]">
        <BarChart chartData={chartData} />
      </div>
    </div>
  );
}

export default App;
