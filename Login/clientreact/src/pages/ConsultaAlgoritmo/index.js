import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/header';
import "./style.css";

const ConsultaAlgoritmo = () => {
    const [metrics, setMetrics] = useState(null);
    const [treeValue, setTreeValue] = useState(17);
    const [leafValue, setLeafValue] = useState(4);
    const [resourceValue, setResourceValue] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = async () => {
        try {
            const response = await axios.get('https://localhost:7181/api/Metrics');
            setMetrics(response.data);
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
        }
    };

    const handleTreeChange = (e) => {
        setTreeValue(e.target.value);
    };

    const handleLeafChange = (e) => {
        setLeafValue(e.target.value);
    };

    const handleResourceChange = (e) => {
        setResourceValue(e.target.value);
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://localhost:7181/api/Metrics', {
                params: {
                    numberOfTrees: treeValue,
                    numberOfLeaves: leafValue,
                    featureFraction: resourceValue
                }
            });
            setMetrics(response.data);
        } catch (error) {
            console.error('Erro ao atualizar os dados:', error);
        } finally {
            setLoading(false);
        }
    };

const cultureNames = ["Cultuas", "", "rice", "maize", "chickpea", "kidneybeans", "pigeonpeas", "mothbeans", "mungbean", "blackgram", "lentil", "pomegranate", "banana", "mango", "grapes", "watermelon", "muskmelon", "apple", "orange", "papaya", "coconut", "cotton", "jute", "coffee"];

const formatConfusionMatrix2 = () => {
    if (metrics && metrics.confusionMatrix) {
        const matrixString = metrics.confusionMatrix;
        const lines = matrixString.split('\r\n');
        const dataRows = lines.slice(3, -2);

        return (
            <table style={{ width: '100%', margin: '20px auto', border: '1px solid #ddd', borderCollapse: 'collapse' }}>
                <tbody>
                    {dataRows.map((row, index) => {
                        const values = row.split('|').slice(1, -1);
                        return (
                            <tr key={index}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{cultureNames[index]}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{values[0].trim()}</td>
                                {values.slice(1).map((value, colIndex) => (
                                    <td key={colIndex} style={{ border: '1px solid #ddd', padding: '8px' }}>{value.trim()}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
};


    return (
        <div>
            <Header/>
            <div class="metrics-explanation">
                <h3>Explicação das Métricas:</h3>
                <p>Accuracy (Precisão): É uma métrica comum para problemas de classificação. Ela mede a proporção de previsões corretas em relação ao total de previsões. A fórmula para cálculo é:</p>
                <p>Accuracy = Número de previsões corretas / Total de previsões</p>

                <p>Log Loss: É uma métrica usada para avaliar a precisão de um modelo de classificação, levando em consideração a probabilidade de cada classificação prevista em comparação com o valor real. O log loss mais próximo de 0 indica um modelo de alta precisão.</p>

                <p>Log Loss Reduction (Redução da Perda de Log): É uma medida que indica o quanto a adição de um modelo de machine learning reduz a perda de log em comparação com um modelo de referência. Quanto maior o valor, melhor é o desempenho do modelo.</p>

                <p>Top K Accuracy (Precisão Top-K): Essa métrica mede a proporção de vezes em que a classe correta está entre as K previsões mais prováveis. Se nenhuma das K previsões principais inclui a classe correta, a precisão é considerada 0.</p>

                <p>Standard Deviation (Desvio Padrão): É uma medida de quão dispersos os valores de um conjunto de dados estão em relação à média. Quanto maior o desvio padrão, mais dispersos estão os dados. É calculado usando a fórmula:</p>
                <p>σ = √(∑(x - x̄)^2 / N)</p>

                <p>Onde:</p>
                <ul>
                    <li>σ é o desvio padrão,</li>
                    <li>x é cada valor no conjunto de dados,</li>
                    <li>x̄ é a média dos valores no conjunto de dados, e</li>
                    <li>N é o número total de valores no conjunto de dados.</li>
                </ul>
                <p>Essas métricas são fundamentais para avaliar a performance e a precisão de modelos de machine learning em problemas de classificação e são usadas para determinar a eficácia do modelo em relação aos dados de treinamento e de teste.</p>
                <h3>Detalhes do Algoritmo:</h3>
                <p>O algoritmo foi realizado com a biblioteca de machine learning da Microsoft e utiliza o algoritmo mlContext.BinaryClassification.Trainers.FastForestnew FastForestBinaryTrainer.Options NumberOfTrees = 17, NumberOfLeaves = 4  na versão mais atual.</p>
                <br />
                <h5>A baixo você pode mudar essas configurações e verificar como isso impacta no algoritmo: </h5>
                <div>
                <div className="input-range" >
                <b>Número de Árvores:</b><br />
                <input type="range" min="1" max="100" value={treeValue} onChange={handleTreeChange} /> <br />
                <span>{treeValue}</span><br />
                    </div>

                    <div className="input-range" >
                        <b>Números de Folhas: </b> <br />
                        <input type="range" min="2" max="100" value={leafValue} onChange={handleLeafChange} /> <br />
                        <span>{leafValue}</span><br />
                    </div>

                    <div className="input-range" >
                        <b>Fração de Recursos: </b> <br />
                        <input type="range" min="0" max="1" step="0.1" value={resourceValue} onChange={handleResourceChange} /> <br />
                        <span>{resourceValue}</span><br />
                    </div>

                    <button onClick={handleUpdate}>Atualizar</button>
                    {loading && <p>Carregando dados da API Metrics...</p>}
                </div>


            </div>
            <div>
            <h2>Consulta à API Metrics e Exibição de Valores</h2>
            {metrics ? (
                <div className="metrics-explanation">
                        <h3>Valores Retornados da API Metrics:</h3>
                        <p>Accuracy: {metrics.accuracy}</p>
                        <p>Log Loss: {metrics.logLoss}</p>
                        <p>Log Loss Reduction: {metrics.logLossReduction}</p>
                        <p>Top K Accuracy: {metrics.topKAccuracy}</p>
                        <p>Standard Deviation: {metrics.standardDeviation}</p>
                        <div>
                            <h3>Confusion Matrix:</h3>
                            <table style={{ width: '50%', margin: '0 auto', border: '1px solid #ddd', borderCollapse: 'collapse' }}>
                                <tbody>
                                    {formatConfusionMatrix2()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p>Carregando dados da API Metrics...</p>
                )}
            </div>
        </div>
    );
};

export default ConsultaAlgoritmo;
