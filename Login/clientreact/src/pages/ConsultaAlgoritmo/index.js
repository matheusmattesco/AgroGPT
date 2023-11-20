import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/header';
import Footer from '../../Components/Footer/footer';
//import "./style.css";

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
            <Header />
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
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-green-700 sm:text-4xl">Explicação das Métricas:</h1>
                                <p className="mt-6 text-xl leading-8 text-gray-700">
                                    Com o Agro GPT, você pode ir além em sua plantacao, e evoluir seus ganhos e também conhecer um pouco mais de Inteligência Artificial

                                </p>
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
                    </div>
                    <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        
                        <table style={{ width: '50%', margin: '0 auto', border: '1px solid #ddd', borderCollapse: 'collapse' }}>
                        <h1>Confusion Matrix:</h1>
                            <tbody>
                                {formatConfusionMatrix2()}
                            </tbody>
                            <div className="metrics-explanation">
                            {metrics && (
                                <div className="metrics-explanation">
                                    <h3>Valores Retornados da API Metrics:</h3>
                                    <p>Accuracy: {metrics.accuracy}</p>
                                    <p>Log Loss: {metrics.logLoss}</p>
                                    <p>Log Loss Reduction: {metrics.logLossReduction}</p>
                                    <p>Top K Accuracy: {metrics.topKAccuracy}</p>
                                    <p>Standard Deviation: {metrics.standardDeviation}</p>
                                </div>
                                )}
                            </div>
                        </table>
                    </div>
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                                <p>
                                    Trata-se de uma ferramente de classificação de culturas com o auxilio utilizando Machine Learning, uma vertente da Inteligência artificial no qual a máquina "Aprende".

                                    Veja a baixo suas funcionalidedades:
                                </p>
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
            <Footer />
        </div>
    );
};

export default ConsultaAlgoritmo;
