import React, { useState } from 'react';

const GerarPredicao = () => {
    const [selectedLabel, setSelectedLabel] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Coloque aqui a lógica para enviar o valor e gerar a predição

        // Exemplo de lógica para exibir o resultado da predição
        const mockResult = {
            Label: 'Wheat',
            AverageN: 80,
            AverageP: 50,
            // ... outros valores
        };
        setResult(mockResult);
    };

    return (
        <div>
            <h2>Gerar Predição</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Selecione o rótulo desejado:
                    <input
                        type="text"
                        value={selectedLabel}
                        onChange={(e) => setSelectedLabel(e.target.value)}
                    />
                </label>
                <button type="submit">Gerar Predição</button>
            </form>
            {result && (
                <div>
                    <h3>Resultado da Predição:</h3>
                    <p>Label: {result.Label}</p>
                    <p>AverageN: {result.AverageN}</p>
                    {/* ... outros valores */}
                </div>
            )}
        </div>
    );
};

export default GerarPredicao;
