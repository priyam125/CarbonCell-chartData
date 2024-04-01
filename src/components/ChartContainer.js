import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import axios from "axios";

const ChartContainer = () => {
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
      const formattedData = response.data.data.map((item) => ({
        nation: item.Nation,
        population: item.Population,
      }));
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
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [populationData]);
  return (
    <div className="md:w-4/5 xl:w-3/5 w-full flex flex-col items-center justify-center md:p-4 border border-slate-900 bg-slate-900/50 rounded-xl h-[500px]">
      <BarChart chartData={chartData} />
    </div>
  );
};

export default ChartContainer;
