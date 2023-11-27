import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/header';
import Footer from '../../Components/Footer/footer';
import ApexCharts from 'react-apexcharts';
import Unifil from '../../assets/unifil.png';
import "./style.css";
import { Button } from '@material-tailwind/react';

const ConsultaAlgoritmo = () => {
    const [metrics, setMetrics] = useState(null);
    const [treeValue, setTreeValue] = useState(17);
    const [leafValue, setLeafValue] = useState(4);
    const [TestFrequency, setTestFrequency] = useState(0.2);
    const [featureFrequency, setFeatureFrequency] = useState(1);
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState(null);
    const token = localStorage.getItem('token');
    

    useEffect(() => {
        fetchMetrics();
    }, []);

    useEffect(() => {
        fetchChartData();
    }, [metrics]);

const fetchMetrics = async () => {
    try {
        const response = await axios.get('https://localhost:7181/api/Metrics' , {
            headers: {
                Authorization: `Bearer ${token}`,
              },
            }); 
        setMetrics(response.data);
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    } finally {
        setLoading(false); // Marcar como não mais carregando, independentemente do resultado
    }
};

    const handleTreeChange = (e) => {
        setTreeValue(e.target.value);
    };

    const handleLeafChange = (e) => {
        setLeafValue(e.target.value);
    };

    const handleTesteChange = (e) => {
        setTestFrequency(e.target.value);
    };

    const handleFeatureChange = (e) => {
        setFeatureFrequency(e.target.value);
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);

            if (!token) {
                // Caso o token não esteja presente, exiba uma mensagem
                alert("Token não encontrado. O usuário não está autenticado.");
                setLoading(false); // Marcar como não mais carregando
                return;
              }

            const response = await axios.get('https://localhost:7181/api/Metrics', {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
                params: {
                    numberOfTrees: treeValue,
                    numberOfLeaves: leafValue,
                    testFraction: TestFrequency,
                    featureFraction: featureFrequency
                }
            });
            setMetrics(response.data);
        } catch (error) {
            console.error('Erro ao atualizar os dados:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchChartData = () => {
        if (metrics) {
            const precisionData = metrics.perClassPrecision.map(val => Math.round(val * 100));

            const chartData = {
                precision: {
                    series: precisionData,
                    options: {
                        chart: {
                            type: 'bar',
                            height: 100,
                            stacked: true,
                        },
                        plotOptions: {
                            bar: {
                                horizontal: false,
                                colors: {
                                    ranges: [
                                        {
                                            color: '#cc2b23',
                                            from: 0,
                                            to: 50,
                                        },
                                        {
                                            color: '#119136',
                                            from: 51,
                                            to: 100,
                                        },
                                    ],
                                },
                            },
                        },
                        xaxis: {
                            categories: cultureNames.slice(2), // Use cultureNames as categories
                        },
                        legend: {
                            position: 'top',
                        },
                    },
                },
            };
    
            setChartData(chartData);
        }
    };

    const cultureNames = ["Culturas", "", "0 rice", "1 maize", "2 chickpea", "3 kidneybeans", "4 pigeonpeas", "5 mothbeans", "6 mungbean", "7 blackgram", "8 lentil", "9 pomegranate", "10 banana", "11 mango", "12 grapes", "13 watermelon", "14 muskmelon", " 15 apple", "16 orange", " 17 papaya", "18 coconut", "19 cotton", "20 jute", "21 coffee"];

    

    const formatConfusionMatrix2 = () => {
        if (metrics && metrics.confusionMatrix) {
          const matrixString = metrics.confusionMatrix;
          const lines = matrixString.split('\r\n');
          const dataRows = lines.slice(3, -2);
      
          return (
            <div className="relative">
            <table className="comicGreen border border-gray-300 rounded-lg overflow-hidden shadow-xl relative z-10">
                <tbody>
                {dataRows.map((row, rowIndex) => {
                    const values = row.split('|').slice(1, -1);
                    return (
                    <tr key={rowIndex}>
                        <td className="culture-cell font-semibold">
                        {rowIndex === 0 ? '' : cultureNames[rowIndex]}
                        </td>
                        {values.map((value, colIndex) => (
                        <td
                            key={colIndex}
                            className="confusion-cell font-semibold"
                            style={{
                            backgroundColor: rowIndex === 0 ? 'transparent' : `rgba(34, 197, 94, ${parseFloat(value.trim()) / 30})`,
                            color: rowIndex === 0 || parseFloat(value.trim()) > 1 ? 'black' : 'white',
                            }}
                        >
                            {value.trim()}
                        </td>
                        ))}
                    </tr>
                    );
                })}
                </tbody>
            </table>
            <div className="absolute top-7 left-7 bg-black h-full w-full z-0 shadow-2xl rounded-lg opacity-70"></div>
            </div>
          );
        }
      };
      




    return (
        <div>
        {loading && (
            <div className="skeleton flex items-center justify-center h-screen w-screen">
            <img
                src={Unifil}
                className="filter grayscale animate-pulse"
                alt="Unifil Logo"
            />
            </div>
        )}

        {!loading && (
           <div >
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
                               <p className="text-base font-semibold leading-7 text-green-600">Métricas</p>
                               <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-800 sm:text-4xl">Explicação do algoritmo:</h1>
                               <p className="mt-6 text-xl leading-8 text-gray-700">
                                   O algoritmo de Inteligência Artificial empregado foi o FastForest da biblioteca ML.NET. Esse algoritmo constrói múltiplas árvores de decisão, analisando as características dos dados para tomar decisões. Cada árvore contribui para a previsão final, resultando em um modelo robusto e eficiente.
                               </p>
                               <a 
                                   className='text-green-600 underline text-xs' 
                                   href="https://learn.microsoft.com/en-us/dotnet/api/microsoft.ml.treeextensions.fasttree?view=ml-dotnet" target="_blank">
                                        link da documentação
                               </a>
                           <div className='p-5 mt-5'>
                               <h1 className=' mb-5 text-xl font-semibold'>O algoritmo final foi treinado utilizado os seguintes parâmetros:</h1>
                               <div className="input-range" >
                                   <b>Número de Árvores:</b><br />
                                   <input type="range" min="1" max="100" value={treeValue} onChange={handleTreeChange} 
                                   className="w-full appearance-none bg-zinc-300 h-1 rounded-md outline-none custom-slider"/> <br />
                                   <span>{treeValue}</span><br />
                               </div>
           
                               <div className="input-range" >
                                   <b>Números de Folhas: </b> <br />
                                   <input 
                                   type="range" 
                                   min="2" 
                                   max="100" 
                                   value={leafValue} 
                                   onChange={handleLeafChange} 
                                   className="w-full appearance-none bg-zinc-300 h-1 rounded-md outline-none custom-slider"
                                   /> <br />
                                   <span>{leafValue}</span><br />
                               </div>
           
                               <div className="" >
                                   <b>Fração de Recursos: </b> <br />
                                   <input
                                   type="range"
                                   min="0.1"
                                   max="0.9"
                                   step="0.1"
                                   value={TestFrequency}
                                   onChange={handleTesteChange}
                                   className="w-full appearance-none bg-zinc-300 h-1 rounded-md outline-none custom-slider"
                                   /> 
                                   <span>{TestFrequency}</span><br />
                               </div>
           
                               <div className="" >
                                   <b>Frequência de Recursos: </b> <br />
                                   <input
                                   type="range"
                                   min="0"
                                   max="1"
                                   step="0.1"
                                   value={featureFrequency}
                                   onChange={handleFeatureChange}
                                   className="w-full appearance-none bg-zinc-300 h-1 rounded-md outline-none custom-slider"
                                   /> 
                                   <span>{featureFrequency}</span><br />
                               </div>

                               <Button onClick={handleUpdate} size="sm"> 
                                Atualizar
                               </Button>
           
                               {loading && <p>Carregando dados da API Metrics...</p>}
                           </div>
                           </div>
                       </div>
                   </div>
                   <div className="-ml-12 -mt-12 p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                   <h1 className='text-base font-semibold leading-7 text-green-600'>Matriz de Confusão:</h1>
                       <table className=''>
                           <tbody className=''>
                               {formatConfusionMatrix2()}
                           </tbody>
                       </table>
                       <span className=' max-w-2xl flex mt-10'>
                           <p>
                           Uma <b className=' font-semibold'>matriz de confusão</b> é uma tabela que mostra o desempenho de um modelo de classificação ao comparar suas previsões com os resultados reais. Ela apresenta o número de verdadeiros positivos, verdadeiros negativos, falsos positivos e falsos negativos, proporcionando uma visão detalhada da precisão e dos erros do modelo. Essa matriz é útil para avaliar o desempenho e a qualidade de algoritmos de classificação.
                           </p>
                       </span>
           
                           <div className='max-w-2xl'>
                           <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Valores</h2>
                               <p className="mt-6">
                               Aqui, podemos examinar dados mais tangíveis, como a acurácia geral do algoritmo, o número total de perdas e o desvio padrão, fornecendo insights sobre a consistência e a distribuição dos resultados.
                               </p>
                           {metrics && (
                               <div className=' border-t-2  p-4 flex gap-16'>
           
                                   
                                   <div>
                                       <h1 className='text-base font-semibold leading-7 text-green-600'>Acurácia:</h1>
                                       <p className='p-3'>{metrics.accuracy}</p>
                                   </div>
                                   <div>
                                       <h1 className='text-base font-semibold leading-7 text-green-600'>Perdas:</h1>
                                       <p className='p-3'>{metrics.logLoss}</p>
                                   </div>
                                   <div>
                                       <h1 className='text-base font-semibold leading-7 text-green-600'>Desvio Padrão:</h1>
                                       <p className='p-3'>{metrics.standardDeviation}</p>
                                   </div>
                               </div>
                               )}
                           </div>
                   </div>
                   <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                       <div className="lg:pr-4">
                           <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                               <p>
                               Logo abaixo, apresentamos um gráfico de Precisão que ilustra a acurácia alcançada para cada cultura durante o treinamento do algoritmo de Inteligência Artificial.
                               </p>
           
                               {chartData && (
                               <div className=' max-w-2xl pt-2 border-t-2  mt-9'>
                               <h2 className='text-base font-semibold leading-7 text-green-600'>Gráfico de Precisão:</h2>
                               <ApexCharts
                                   options={chartData.precision.options}
                                   series={[{ data: chartData.precision.series }]}
                                   type="bar"
                                   height={300}
                               />
                               </div>
                           )}
           
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <Footer />
           
           </div>
        )}
    </div>
       
    );
};

export default ConsultaAlgoritmo;


