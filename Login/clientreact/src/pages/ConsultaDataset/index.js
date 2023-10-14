import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            <h2>Consulta à API e Exibição de Valores</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Selecione a cultura desejada:
                    <input
                        type="text"
                        value={selectedLabel}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Consultar</button>
            </form>
            {data ? (
                <div>
                    <h3>Valores Retornados da API:</h3>
                    <p>Label: {data.label}</p>
                    <p>AverageN: {data.averageN}</p>
                    <p>AverageP: {data.averageP}</p>
                    {/* ... outras propriedades */}
                </div>
            ) : (
                <p>Carregando dados...</p>
            )}
        </div>
    );
};

export default ConsultaDataset;