import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/header';
import "./style.css";
import M from 'materialize-css';

const ConsultaDataset = () => {
    const [selectedLabel, setSelectedLabel] = useState('rice'); // Valor padrão
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://localhost:7181/api/dataset/${selectedLabel}`);
            setData(response.data);
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
        }
    };

    const Opcoes = [
        "rice", "maize", "chickpea", "kidneybeans", "pigeonpeas",
        "mothbeans", "mungbean", "blackgram", "lentil", "pomegranate",
        "banana", "mango", "grapes", "watermelon", "muskmelon",
        "apple", "orange", "papaya", "coconut", "cotton",
        "jute", "coffee"
    ];

    useEffect(() => {
        const initializeSelect = () => {
            const elems = document.querySelectorAll('select');
            window.M.FormSelect.init(elems, {});
        };

        initializeSelect();
    }, []);
      

    useEffect(() => {
        fetchData();
    }, [selectedLabel]);

    const handleInputChange = (event) => {
        setSelectedLabel(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData();
    };

    return (
        <div>
             <Header/>
             <h2>Visão Geral do Dataset</h2>
            <p>Nesta página, exibimos alguns dos dados do dataset utilizado para o treinamento do algoritmo. Você pode selecionar a cultura desejada na barra de pesquisa para verificar e validar diferentes conjuntos de dados relevantes. Os dados exibidos são resultados médios e extremos coletados ao longo de um determinado período de tempo, fornecendo insights valiosos para análise e avaliação.</p>
            <h2>Download do Dataset em CSV</h2>
            <p>O dataset consiste em um total de 2201 linhas, representando dados agrícolas, e é organizado em 22 culturas diferentes para análise e modelagem do algoritmo.</p>
            <a href="src\assets\Crop_recommendation.csv" download>
                <button>Download do Dataset CSV</button>
            </a>
             <div className='div-form'>
                 <h2>Consulta à API e Exibição de Valores</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                    Selecione a cultura desejada:
                    <div className='input-field col s12'>
                    <select 
                        value={selectedLabel} 
                        onChange={handleInputChange}
                        className="custom-select">
                            
                            <option value="" disabled selected>Selecione...</option>
                            {Opcoes.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                    </select>
                    </div>
                    </label>
                    
                </form>
            </div>
                {data ? (
                        <div className='resultados-dataset'>
                            <h3>Valores Retornados da API:</h3>
                            <p>Label: {data.label}</p>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1 }}>
                                <p>MinN: {data.minN.toFixed(2)}</p>
                                <p>MinP: {data.minP.toFixed(2)}</p>
                                <p>MinK: {data.minK.toFixed(2)}</p>
                                <p>MinTemperature: {data.minTemperature.toFixed(2)}</p>
                                <p>MinHumidity: {data.minHumidity.toFixed(2)}</p>
                                <p>MinpH: {data.minpH.toFixed(2)}</p>
                                <p>MinRainfall: {data.minRainfall.toFixed(2)}</p>

                            </div>
                            <div style={{ flex: 1 }}>
                                <p>MaxN: {data.maxN.toFixed(2)}</p>
                                <p>MaxP: {data.maxP.toFixed(2)}</p>                                
                                <p>MaxK: {data.maxK.toFixed(2)}</p>
                                <p>MaxTemperature: {data.maxTemperature.toFixed(2)}</p>                              
                                <p>MaxHumidity: {data.maxHumidity.toFixed(2)}</p>                               
                                <p>MaxpH: {data.maxpH.toFixed(2)}</p>                               
                                <p>MaxRainfall: {data.maxRainfall.toFixed(2)}</p>
                            </div>
                            </div>
                            <p>AverageN: {data.averageN.toFixed(2)}</p>
                                <p>AverageP: {data.averageP.toFixed(2)}</p>
                                <p>AverageK: {data.averageK.toFixed(2)}</p>
                                <p>AverageTemperature: {data.averageTemperature.toFixed(2)}</p>
                                <p>AverageHumidity: {data.averageHumidity.toFixed(2)}</p>
                                <p>AveragepH: {data.averagepH.toFixed(2)}</p>
                                <p>AverageRainfall: {data.averageRainfall.toFixed(2)}</p>
                    </div>
            ) : (
                <p>Carregando dados...</p>
            )}
        </div>
    );
};

export default ConsultaDataset;