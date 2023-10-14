import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConsultaAlgoritmo = () => {
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await axios.get('https://localhost:7181/api/Metrics');
                setMetrics(response.data);
            } catch (error) {
                console.error('Erro ao buscar os dados:', error);
            }
        };

        fetchMetrics();
    }, []);

    const formatConfusionMatrix = () => {
        if (metrics && metrics.confusionMatrix) {
            const rows = metrics.confusionMatrix.split('||');
            const matrixRows = rows.map((row, index) => {
                const columns = row.split('|');
                return (
                    <tr key={index}>
                        {columns.map((column, columnIndex) => (
                            <td key={columnIndex}>{column}</td>
                        ))}
                    </tr>
                );
            });
            return matrixRows;
        }
    };

    return (
        <div>
            <h2>Consulta à API Metrics e Exibição de Valores</h2>
            {metrics ? (
                <div>
                    <h3>Valores Retornados da API Metrics:</h3>
                    <p>Accuracy: {metrics.accuracy}</p>
                    <p>Log Loss: {metrics.logLoss}</p>
                    <p>Log Loss Reduction: {metrics.logLossReduction}</p>
                    <p>Top K Accuracy: {metrics.topKAccuracy}</p>
                    <p>Standard Deviation: {metrics.standardDeviation}</p>
                    <div>
                        <h3>Confusion Matrix:</h3>
                        <table style={{ width: '100%' }}>
                            <tbody>{formatConfusionMatrix()}</tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>Carregando dados da API Metrics...</p>
            )}
        </div>
    );
};

export default ConsultaAlgoritmo;
