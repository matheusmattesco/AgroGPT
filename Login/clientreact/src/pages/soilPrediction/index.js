import React, { useState } from "react";
import './style.css';


export default function SoilPrediction() {
    const [temperature, setTemperature] = useState(20);
    const [humidity, setHumidity] = useState(80);
    const [nValue, setNValue] = useState(90);
    const [pValue, setPValue] = useState(42);
    const [kValue, setKValue] = useState(43);
    const [phValue, setPhValue] = useState(6);
    const [rainfallValue, setRainfallValue] = useState(200);
    const [predictedLabel, setPredictedLabel] = useState('');
    const [result2, setResult2] = useState('');
    const [maxNumber, setMaxNumber] = useState(0);

    const handlePredict = async () => {
        const inputData = {
            Temperature: temperature,
            Humidity: humidity,
            N: nValue,
            P: pValue,
            K: kValue,
            Ph: phValue,
            Rainfall: rainfallValue,
            Label: "teste"
        };

        try {
            const apiUrl = 'https://localhost:7181';
            const response = await fetch(apiUrl + '/api/MachineLearning/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Certifique-se de que a origem esteja correta
                    'Origin': 'http://localhost:3000'
                },
                body: JSON.stringify(inputData)
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch. Status: ${response.status}`);
            }

            const prediction = await response.json();
            const scores = prediction.score;
            const maxNumber = Math.max(...scores) * 100;

            // Mapeando os rótulos
            const labels = [
                "arroz", "milho", "grão de bico", "feijão", "feijão bóer",
                "feijão mensal", "feijão mungo", "blackgram", "lentilha", "romã",
                "banana", "manga", "uvas", "melancia", "melão",
                "maçã", "laranja", "mamão", "coco", "algodão",
                "juta", "café"
            ];

            // Mapeando os rótulos para nomes mais amigáveis
            const labeledScores = scores.map((value, index) => ({
                nome: labels[index],
                score: value
            }));

            const maxScoreIndex = scores.indexOf(Math.max(...scores));
            const newPredictedLabel = labels[maxScoreIndex];
            setPredictedLabel(newPredictedLabel);
            setResult2(JSON.stringify(labeledScores, null, 2));
            setMaxNumber(maxNumber.toFixed(2));
        } catch (error) {
            console.error("Erro na solicitação:", error);
        }
    };

    return (
        <div className="container">
            <h1>Insira os dados do solo:</h1>

            <div className="input-container">
                <label htmlFor="nValue">Nitrogênio:</label>
                <input
                    type="number"
                    id="nValue"
                    step="0.1"
                    placeholder="N"
                    value={nValue}
                    onChange={(e) => setNValue(parseFloat(e.target.value))}
                />
            </div>
            <div className="input-container">
                <label htmlFor="pValue">Fosforo:</label>
                <input
                    type="number"
                    id="pValue"
                    step="0.1"
                    placeholder="P"
                    value={pValue}
                    onChange={(e) => setPValue(parseFloat(e.target.value))}
                />
            </div>
            <div className="input-container">
                <label htmlFor="kValue">Potássio:</label>
                <input
                    type="number"
                    id="kValue"
                    step="0.1"
                    placeholder="K"
                    value={kValue}
                    onChange={(e) => setKValue(parseFloat(e.target.value))}
                />
            </div>
            <div className="input-container">
                <label htmlFor="temperature">Temperature:</label>
                <input
                    type="number"
                    id="temperature"
                    step="0.1"
                    placeholder="Temperature"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                />
            </div>
            <div className="input-container">
                <label htmlFor="humidity">Umidade:</label>
                <input
                    type="number"
                    id="humidity"
                    step="0.1"
                    placeholder="Humidity"
                    value={humidity}
                    onChange={(e) => setHumidity(parseFloat(e.target.value))}
                />
            </div>
            <div className="input-container">
                <label htmlFor="phValue">Ph:</label>
                <input
                    type="number"
                    id="phValue"
                    step="0.1"
                    placeholder="Ph"
                    value={phValue}
                    onChange={(e) => setPhValue(parseFloat(e.target.value))}
                />
            </div>
            <div className="input-container">
                <label htmlFor="rainfallValue">Quantidade de Chuva:</label>
                <input
                    type="number"
                    id="rainfallValue"
                    step="0.1"
                    placeholder="Rainfall"
                    value={rainfallValue}
                    onChange={(e) => setRainfallValue(parseFloat(e.target.value))}
                    />
                </div>
    
                {/* Botão de previsão */}
                <div id="button-div">
                    <button id="predictBtn" onClick={handlePredict}>
                        Realizar Predição
                    </button>
                </div>
    
                {/* Resultados */}
                <div id="result" className="result-container">
                    A Melhor cultura para o seu solo é {predictedLabel} e com a porcentagem de sucesso de {maxNumber}%
                </div>
                <div id="result2" className="result-container2">
                    {result2}
                </div>
            </div>
        );
    }