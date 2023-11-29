import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import ApexChart from 'react-apexcharts';
import CSV from '../../assets/Crop_recommendation.csv';
import { Select, Option } from "@material-tailwind/react";

const Opcoes = [
    "all", "rice", "maize", "chickpea", "kidneybeans", "pigeonpeas",
    "mothbeans", "mungbean", "blackgram", "lentil", "pomegranate",
    "banana", "mango", "grapes", "watermelon", "muskmelon",
    "apple", "orange", "papaya", "coconut", "cotton",
    "jute", "coffee"
  ];



function CSVLoader() {

    
    const [options, setOptions] = useState({
        chart: {
          animations: {
            enabled: false,
          },
          height: 350,
          type: 'scatter',
          zoom: {
            enabled: true,
            type: 'xy'
          },  
        },
        grid: {
          xaxis: {
            lines: {
              show: true
            }
          },
        },
        xaxis: {
          lines: {
            show: true
          },
            tickAmount: 10,
            labels: {
              formatter: function(val) {
                return parseFloat(val).toFixed(1)
              }
            }
          },
        yaxis: {
          lines: {
            show: true
          },
          tickAmount: 10,
          labels: {
            formatter: function(val) {
              return parseFloat(val).toFixed(1)
            }
          }
        },
        markers: {
          size: 4,
        },
        colors: [
            '#119136', '#ffb6c1', '#add8e6', '#98fb98', '#dda0dd', '#87ceeb',
            '#f08080', '#90ee90', '#ff6347', '#dda0dd', '#00fa9a', '#ff69b4',
            '#87cefa', '#fa8072', '#98fb98', '#ff4500', '#dda0dd', '#ffb6c1',
            '#ff7f50', '#00ffff'
          ]
      });
      
        const [series, setSeries] = useState([]);
        const [xColumn, setXColumn] = useState('humidity');
        const [yColumn, setYColumn] = useState('temperature');
        const [selectedLabel, setSelectedLabel] = useState("all");

        
      
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

          const handleInputChange = (value) => {
            setSelectedLabel(value);
        };

          useEffect(() => {
            handleFile();
          }, [xColumn, yColumn, selectedLabel]);


return (
    <div>
      <div className='flex-column p-6'>
        <div className=' m-5'>
        <Select 
            id="xColumn" 
            value={xColumn} 
            onChange={(value) => handleXColumnChange({ target: { value } })} 
            label="Coluna X"
        >
          <Option value="N">N</Option>
          <Option value="P">P</Option>
          <Option value="K">K</Option>
          <Option value="temperature">Temperature</Option>
          <Option value="humidity">Humidity</Option>
          <Option value="ph">pH</Option>
          <Option value="rainfall">Rainfall</Option>
        </Select>
        </div>

        <div className=' m-5'>
        <Select 
            id="yColumn" 
            value={yColumn} 
            onChange={(value) => handleYColumnChange({ target: { value } })} 
            label="Coluna Y"
        >
          <Option value="N">N</Option>
          <Option value="P">P</Option>
          <Option value="K">K</Option>
          <Option value="temperature">Temperature</Option>
          <Option value="humidity">Humidity</Option>
          <Option value="ph">pH</Option>
          <Option value="rainfall">Rainfall</Option>
        </Select>
        </div>

        <div className=' m-5'>
        <Select 
            onChange={(value) => handleInputChange(value)}
            color="green"
            label="Selecionar Cultura"
            value={selectedLabel} 
        >
        
        {Opcoes.map((item, index) => (
        <Option key={index} value={item}>
            {item === "all" ? "Todas as culturas" : item}
        </Option>
    ))}
        </Select>
        </div>
      </div>

        <ApexChart options={options} series={series} type="scatter" height={350} />
    </div>
  );
}
export default CSVLoader;