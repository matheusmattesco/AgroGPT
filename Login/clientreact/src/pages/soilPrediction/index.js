import React, { useState } from "react";
import './style.css';
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import InicioIMG from '../../assets/plantacao-arte-digital.jpg';


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
        <div>
                    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 mt-12">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg
                    className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                            width={200}
                            height={200}
                            x="50%"
                            y={-1}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                        <path
                            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                            strokeWidth={0}
                        />
                    </svg>
                    <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
                </svg>
            </div>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <p className="text-base font-semibold leading-7 text-green-600">Agro GPT</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">O melhor Classificador</h1>
                            <p className="mt-6 text-xl leading-8 text-gray-700">
                                Com o Agro GPT, você pode ir além em sua plantacao, e evoluir seus ganhos e também conhecer um pouco mais de Inteligência Artificial 
                            </p>
                        </div>
                    </div>
                </div>
                <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <img
                        className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                        src={InicioIMG}
                        alt=""
                    />
                </div>
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                            <p>
                                Trata-se de uma ferramente de classificação de culturas com o auxilio utilizando Machine Learning, uma vertente da Inteligência artificial no qual a máquina "Aprende".

                                Veja a baixo suas funcionalidedades: 
                            </p>
                            <ul role="list" className="mt-8 space-y-8 text-gray-600">
                                <li className="flex gap-x-3">
                                    <CloudArrowUpIcon className="mt-1 h-5 w-5 flex-none text-green-600" aria-hidden="true" />
                                    <span>
                                        <strong className="font-semibold text-gray-900">Classificação.</strong> Lorem ipsum, dolor sit amet
                                        consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate
                                        blanditiis ratione.
                                    </span>
                                </li>
                                <li className="flex gap-x-3">
                                    <LockClosedIcon className="mt-1 h-5 w-5 flex-none text-green-600" aria-hidden="true" />
                                    <span>
                                        <strong className="font-semibold text-gray-900">Dataset.</strong> Anim aute id magna aliqua
                                        ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                                    </span>
                                </li>
                                <li className="flex gap-x-3">
                                    <ServerIcon className="mt-1 h-5 w-5 flex-none text-green-600" aria-hidden="true" />
                                    <span>
                                        <strong className="font-semibold text-gray-900">Algoritmo.</strong> Ac tincidunt sapien
                                        vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.
                                    </span>
                                </li>
                                <li className="flex gap-x-3">
                                    <ServerIcon className="mt-1 h-5 w-5 flex-none text-green-600" aria-hidden="true" />
                                    <span>
                                        <strong className="font-semibold text-gray-900">Histórico.</strong> Ac tincidunt sapien
                                        vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.
                                    </span>
                                </li>
                            </ul>
                            <p className="mt-8">
                                Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor
                                fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac
                                adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
                            </p>
                            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">No server? No problem.</h2>
                            <p className="mt-6">
                                Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh.
                                Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed
                                tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam
                                turpis ipsum eu a sed convallis diam.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <h1>Insira os dados do soloo:</h1>

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
            
        </div>
        );
    }