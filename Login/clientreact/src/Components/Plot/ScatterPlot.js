import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import ApexChart from 'react-apexcharts';
import CSV from '../../assets/Crop_recommendation.csv';

const Opcoes = [
    "rice", "maize", "chickpea", "kidneybeans", "pigeonpeas",
    "mothbeans", "mungbean", "blackgram", "lentil", "pomegranate",
    "banana", "mango", "grapes", "watermelon", "muskmelon",
    "apple", "orange", "papaya", "coconut", "cotton",
    "jute", "coffee"
  ];



function CSVLoader() {
        const [options, setOptions] = useState({
          chart: {
            height: 350,
            type: 'scatter',
            zoom: {
              enabled: true,
              type: 'xy'
            }
          },
          xaxis: {
            tickAmount: 10,
            labels: {
              formatter: function (val) {
                return parseFloat(val).toFixed(1);
              }
            }
          },
          yaxis: {
            tickAmount: 7
          }
        });
      
        const [series, setSeries] = useState([]);
        const [xColumn, setXColumn] = useState('humidity');
        const [yColumn, setYColumn] = useState('temperature');
        const [selectedLabel, setSelectedLabel] = useState("rice");
      
        const handleFile = () => {
            Papa.parse(CSV, {
              download: true,
              header: true,
              skipEmptyLines: true,
              complete: function (result) {
                let labels;
                if (selectedLabel === "all") {
                  labels = [...new Set(result.data.map(item => item.label))];
                } else {
                  labels = [selectedLabel];
                }
        
                const uniqueLabels = labels;
                const generatedSeries = uniqueLabels.map(label => {
                  const dataPoints = result.data
                    .filter(item => item.label === label)
                    .map(item => [parseFloat(item[xColumn]), parseFloat(item[yColumn])]);
                  return { name: label, data: dataPoints };
                });
      
              setOptions({
                ...options,
                xaxis: {
                  ...options.xaxis,
                  categories: uniqueLabels
                }
              });
      
              setSeries(generatedSeries);
            }
          });
        };

        const handleXColumnChange = (event) => {
            setXColumn(event.target.value);
          };
        
          const handleYColumnChange = (event) => {
            setYColumn(event.target.value);
          };

          const handleLabelChange = (event) => {
            setSelectedLabel(event.target.value);
          };

          useEffect(() => {
            handleFile();
          }, [xColumn, yColumn, selectedLabel]);


return (
    <div>
      <div>
        <label htmlFor="xColumn">Escolha a coluna X:</label>
        <select id="xColumn" value={xColumn} onChange={handleXColumnChange}>
          <option value="N">N</option>
          <option value="P">P</option>
          <option value="K">K</option>
          <option value="temperature">Temperature</option>
          <option value="humidity">Humidity</option>
          <option value="ph">pH</option>
          <option value="rainfall">Rainfall</option>
        </select>

        <label htmlFor="yColumn">Escolha a coluna Y:</label>
        <select id="yColumn" value={yColumn} onChange={handleYColumnChange}>
          <option value="N">N</option>
          <option value="P">P</option>
          <option value="K">K</option>
          <option value="temperature">Temperature</option>
          <option value="humidity">Humidity</option>
          <option value="ph">pH</option>
          <option value="rainfall">Rainfall</option>
        </select>

        <label htmlFor="label">Escolha a label:</label>
        <select id="label" value={selectedLabel} onChange={handleLabelChange}>
          <option value="all">Todas as labels</option>
          {Opcoes.map((label) => (
            <option key={label} value={label}>{label}</option>
          ))}
        </select>
      </div>
      <br />
      <ApexChart options={options} series={series} type="scatter" height={350} />
    </div>
  );
}
export default CSVLoader;