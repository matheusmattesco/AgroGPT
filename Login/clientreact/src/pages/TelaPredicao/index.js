import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/header';
import Footer from '../../Components/Footer/footer';
import './style.css';
import M from 'materialize-css';
import GerarPDF from '../../Components/PDF/pdf';


const GerarPredicaoTeste = () => {


          const [temperature, setTemperature] = useState();
          const [humidity, setHumidity] = useState();
          const [nValue, setNValue] = useState();
          const [Autor, setAutor] = useState("");
          const [nome, setNome] = useState("");
          const [pValue, setPValue] = useState();
          const [kValue, setKValue] = useState();
          const [phValue, setPhValue] = useState();
          const [rainfallValue, setRainfallValue] = useState();
          const [predictedLabel, setPredictedLabel] = useState('');
          const [result2, setResult2] = useState('');
          const [maxNumber, setMaxNumber] = useState();
          const [data, setData] = useState(new Date().toISOString().slice(0, 10));

          const handlePredict = async () => {
            const inputData = {
                Autor : Autor,
                Nome : nome,
                Temperature: temperature,
                Humidity: humidity,
                N: nValue,
                P: pValue,
                K: kValue,
                Ph: phValue,
                Rainfall: rainfallValue,
                Data: data,
                Label: "teste"
            };

            try {
                const apiUrl = 'https://localhost:7181';
                const response = await fetch(apiUrl + '/api/MachineLearning/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
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
                    "coco", "milho", "grão de bico", "feijão", "feijão bóer",
                    "feijão mensal", "feijão mungo", "blackgram", "lentilha", "romã",
                    "banana", "manga", "uvas", "melancia", "melão",
                    "maçã", "laranja", "mamão", "arroz", "algodão",
                    "juta", "café"
                ];

                // Mapeando os rótulos para nomes mais amigáveis
                const labeledScores = scores.map((value, index) => ({
                    nome: labels[index],
                    score: value
                }));

                const maxScoreIndex = scores.indexOf(Math.max(...scores));
                const newPredictedLabel = prediction.predictedLabel;
                setPredictedLabel(newPredictedLabel);
                setResult2(JSON.stringify(labeledScores, null, 2));
                setMaxNumber(maxNumber.toFixed(2));

                GerarPDF({
                    n: nValue,
                    p: pValue,
                    k: kValue,
                    temperature: temperature,
                    humidity: humidity,
                    ph: phValue,
                    rainfall: rainfallValue,
                    label: "teste",
                    featuresJson: "", // Adicione os valores corretos aqui
                    features: [0], // Adicione os valores corretos aqui
                    predictedLabel: newPredictedLabel,
                    scoreJson: "", // Adicione os valores corretos aqui
                    score: [0], // Adicione os valores corretos aqui
                    autor: Autor,
                    nome: nome,
                    data: data
                  });

            } catch (error) {
                console.error("Erro na solicitação:", error);
            }
        };

        //Botao para adicionar inputs
        const [inputs, setInputs] = useState([{ id: 1, value: '' }]);
        const [idCount, setIdCount] = useState(1);

        const handleAddInput = () => {
          const newId = idCount + 1;
          setIdCount(newId);
          const newInputs = [...inputs, { id: newId, value: '' }];
          setInputs(newInputs);
        
          const modalDiv = document.getElementById("modal1");
          const newDiv = document.createElement("div");
          newDiv.appendChild(document.createTextNode("Deu certo"));
          modalDiv.appendChild(newDiv);
        };




    useEffect(() => {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems, {});
  }, []);

      const handleModalOpen = () => {
        var modalElem = document.querySelector('#modal1');
        if (modalElem) {
            var instance = M.Modal.getInstance(modalElem);
            instance.open();
        }
    };

    const handleModalClose = () => {
        var modalElem = document.querySelector('#modal1');
        if (modalElem) {
            var instance = M.Modal.getInstance(modalElem);
            instance.close();
        }
    };
    

    return (  
        <div>
          <Header/>
          <div className='container-predicao'>
            
            <h1>Bem vindo a tela de predicao</h1>
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <svg class="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
                </svg>
                <a href="#">
                    <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Need a help in Claim?</h5>
                </a>
                <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Go to this step by step guideline process on how to certify for your weekly benefits:</p>
                <a href="#" class="inline-flex items-center text-blue-600 hover:underline">
                    See our guideline
                    <svg class="w-3 h-3 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                    </svg>
                </a>
            </div>
            <p>Aqui fica o coração da aplicação, no qual havera inputs e você podera testar o algoritmo</p>
            <p>Logo abaixo temos o input e o significado ao lado de cada um</p>
            <div className='form-predicao'>
            <a className="waves-effect waves-light btn modal-trigger" href="#modal1" onClick={handleModalOpen}>Modal</a>

                <div id="modal1" class="modal">
                  <div class="row">
                  <h3>Insira os dados do solo:</h3>
                  <form>
                  <div className='input-field'>
                      <label htmlFor="nValue">Autor:</label>
                      <input
                        type="text"
                        id="nValue"
                        value={Autor}
                        onChange={(e) => setAutor(e.target.value)}
                      />
                    </div>
                    <div className='input-field'>
                      <label htmlFor="nValue">Nome do teste:</label>
                      <input
                        type="text"
                        id="nValue"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                    </div>

                    <div className='input-field'>
                          <label htmlFor="nValue">Nitrogênio:</label>
                          <input
                              type="number"
                              id="nValue"
                              step="0.1"
                              value={nValue}
                              onChange={(e) => setNValue(parseFloat(e.target.value))}
                          />
                      </div>
                      <div className='input-field'>
                          <label htmlFor="pValue">Fosforo:</label>
                          <input
                              type="number"
                              id="pValue"
                              step="0.1"
                              value={pValue}
                              onChange={(e) => setPValue(parseFloat(e.target.value))}
                          />
                      </div>
                      <div className='input-field'>
                          <label htmlFor="kValue">Potássio:</label>
                          <input
                              type="number"
                              id="kValue"
                              step="0.1"
                              value={kValue}
                              onChange={(e) => setKValue(parseFloat(e.target.value))}
                          />
                      </div>
                      <div className='input-field'>
                          <label htmlFor="temperature">Temperature:</label>
                          <input
                              type="number"
                              id="temperature"
                              step="0.1"
                              value={temperature}
                              onChange={(e) => setTemperature(parseFloat(e.target.value))}
                          />
                      </div>
                      <div className='input-field'>
                          <label htmlFor="humidity">Umidade:</label>
                          <input
                              type="number"
                              id="humidity"
                              step="0.1"
                              value={humidity}
                              onChange={(e) => setHumidity(parseFloat(e.target.value))}
                          />
                      </div>
                      <div className='input-field'>
                          <label htmlFor="phValue">Ph:</label>
                          <input
                              type="number"
                              id="phValue"
                              step="0.1"
                              value={phValue}
                              onChange={(e) => setPhValue(parseFloat(e.target.value))}
                          />
                      </div>
                      <div className='input-field'>
                          <label htmlFor="rainfallValue">Quantidade de Chuva:</label>
                          <input
                              type="number"
                              id="rainfallValue"
                              step="0.1"
                              value={rainfallValue}
                              onChange={(e) => setRainfallValue(parseFloat(e.target.value))}
                              />
                          </div>
                          <div className='input-field' style={{ display: 'none' }}>
                            <label htmlFor="rainfallValue">Data do teste:</label>
                            <input
                              type="date"
                              id="rainfallValue"
                              value={data}
                              onChange={(e) => setData(e.target.value)}
                            />
                          </div>
                          </form>
                    </div>
                  
                  <button onClick={handleModalClose}>Fechar Modal</button>
                  <button onClick={handleAddInput}>Add input</button>
                  <button id="predictBtn" onClick={handlePredict}> Realizar Predição </button>
          <div id="result" className="result-container">
                    A Melhor cultura para o seu solo é {predictedLabel} e com a porcentagem de sucesso de {maxNumber}%
                </div>
                
                <div id="result2" className="result-container2">
                       {JSON.stringify(result2)}
                </div>
                  
                </div>

            </div>


          </div>
          <Footer/>
      </div>
    );
};

export default GerarPredicaoTeste;
