import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/header';
//import "./style.css";
import { Select, Option } from "@material-tailwind/react";
import CSVLoader from '../../Components/Plot/ScatterPlot';
import Footer from '../../Components/Footer/footer';
import html2canvas from 'html2canvas';
import { FaCloudDownloadAlt } from "react-icons/fa";



const ConsultaDataset = () => {
    const [selectedLabel, setSelectedLabel] = useState(''); // Valor padrão
    const [data, setData] = useState(null);
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);


    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const handleScreenshot = async () => {
        const divElement = document.getElementById('suaDivId'); 
        const canvas = await html2canvas(divElement);
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'Relatorio-Dataset.png';
        link.click();
    };

    const handleScreenshot2 = async () => {
        const divElement = document.getElementById('suaDivId2');
        const canvas = await html2canvas(divElement);
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'Grafico-Dispersao.png';
        link.click();
    };


    const fetchData = async () => {
        try {
            const response = await axios.get(`https://localhost:7181/api/dataset/${selectedLabel}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
        fetchData();
        setLoading(true);

        if (!token) {
            // Caso o token não esteja presente, exiba uma mensagem
            alert("Token não encontrado. O usuário não está autenticado.");
            setLoading(false);
            return;
        }
    }, [selectedLabel]);

    const handleInputChange = (value) => {
        setSelectedLabel(value);
    };

    return (
        <div>
            <Header />
            <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 mt-12">


                {/* LADO ESQUERDO*/}

                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="lg:max-w-lg">
                                <p className="text-base font-semibold leading-7 text-green-600">Dataset</p>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Consultar Dados Utilizados</h1>
                                <p className="mt-6 text-xl leading-8 text-gray-700">
                                    Aqui nessa seção, é disponibilizado o dataset utilizado par ao treinamento e a opção de consultar e entender um pouco mais do funcionamento
                                </p>
                                <div className="lg:pr-4">
                                    <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                                        <p className=' py-10'>
                                            Selecione uma Cultura ao lado direito para gerar um relatório completo do dataset com as informações uteis utilizadas para o treinamento do algoritmo:
                                        </p>



                                        <Select
                                            onChange={(value) => handleInputChange(value)}
                                            color="green"
                                            label="Selecionar Cultura"
                                            value={selectedLabel}
                                        // Adicione a propriedade 'value' ao Select
                                        >
                                            {Opcoes.map((item, index) => (
                                                <Option key={index} value={item}>{item}</Option>
                                            ))}
                                        </Select>

                                        {data ? (
                                            <div id="suaDivId" className="resultados-dataset mt-10 bg-gray-300/40 p-10">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Relatório Dataset:</h3>

                                                    <button onClick={handleScreenshot} className="text-3xl text-green-600">
                                                        <FaCloudDownloadAlt />
                                                    </button>
                                                </div>

                                                <div className="mt-6 border-t border-gray-600">
                                                    <dl className="divide-y divide-gray-100">
                                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-xl font-medium leading-6 text-gray-900">Cultura</dt>
                                                            <dd className="mt-1 text-xl leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.label}</dd>
                                                        </div>
                                                    </dl>
                                                </div>

                                                <div className="mt-6 border-t border-gray-600">
                                                    <dl className="divide-y divide-gray-300 flex flex-col">
                                                        <div className="px-4 pt-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Nitrogênio Minimo</dt>
                                                            <dd className="text-sm font-medium leading-6 text-gray-900">Nitrogênio Médio</dd>
                                                            <dd className="text-sm font-medium leading-6 text-gray-900">Nitrogênio Máximo</dd>
                                                        </div>

                                                        <div className="px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.minN.toFixed(2)}</dt>
                                                            <dd className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.averageN.toFixed(2)}</dd>
                                                            <dd className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.maxN.toFixed(2)}</dd>
                                                        </div>

                                                        <div className="px-4 pt-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Fosforo Minimo</dt>
                                                            <dd className="text-sm font-medium leading-6 text-gray-900">Fosforo Médio</dd>
                                                            <dd className="text-sm font-medium leading-6 text-gray-900">Fosforo Máximo</dd>
                                                        </div>

                                                        <div className="px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.minP.toFixed(2)}</dt>
                                                            <dd className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.averageP.toFixed(2)}</dd>
                                                            <dd className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.maxP.toFixed(2)}</dd>
                                                        </div>

                                                        <div className="px-4 pt-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Potassio Minimo</dt>
                                                            <dd className="text-sm font-medium leading-6 text-gray-900">Potassio Médio</dd>
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Potassio Minimo</dt>
                                                        </div>

                                                        <div className="px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.minK.toFixed(2)}</dt>
                                                            <dd className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.averageK.toFixed(2)}</dd>
                                                            <dd className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.maxK.toFixed(2)}</dd>
                                                        </div>

                                                        <div className="px-4 pt-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Temperatura Minima</dt>
                                                            <dd className="text-sm font-medium leading-6 text-gray-900">Temperatura Média</dd>
                                                            <dd className="text-sm font-medium leading-6 text-gray-900">Temperatura Máxima</dd>
                                                        </div>

                                                        <div className="px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.minTemperature.toFixed(2)}</dt>
                                                            <dd className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.averageTemperature.toFixed(2)}</dd>
                                                            <dd className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.maxTemperature.toFixed(2)}</dd>
                                                        </div>

                                                        <div className="px-4 pt-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Umidade Minima</dt>
                                                            <dd className="text-sm font-medium leading-6 text-gray-900">Umidade Média</dd>
                                                            <dd className="text-sm font-medium leading-6 text-gray-900">Umidade Maxima</dd>
                                                        </div>

                                                        <div className="px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.minHumidity.toFixed(2)}</dt>
                                                            <dd className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.averageHumidity.toFixed(2)}</dd>
                                                            <dd className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.maxHumidity.toFixed(2)}</dd>
                                                        </div>

                                                        <div className="px-4 pt-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Nível de Chuva Minimo</dt>
                                                            <dd className="text-sm font-medium leading-6 text-gray-900">Nível de Chuva Maximo</dd>
                                                            <dd className="text-sm font-medium leading-6 text-gray-900">Nível de Chuva Média</dd>
                                                        </div>

                                                        <div className="px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.minRainfall.toFixed(2)}</dt>
                                                            <dd className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.averageRainfall.toFixed(2)}</dd>
                                                            <dd className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.maxRainfall.toFixed(2)}</dd>
                                                        </div>

                                                        <div className="px-4 pt-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">PH Mínimo</dt>
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">PH Médio</dt>
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">PH Máximo</dt>
                                                        </div>
                                                        <div className="px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.minpH.toFixed(2)}</dt>
                                                            <dd className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.averagepH.toFixed(2)}</dd>
                                                            <dd className=" text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{data.maxpH.toFixed(2)}</dd>
                                                        </div>
                                                        <div className="px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        </div>
                                                    </dl>
                                                </div>

                                            </div>
                                        ) : (
                                            <p>Selecione uma cultura para carregar dados...</p>
                                        )}

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>



                    {/* LADO DIRETO*/}




                    <div className="-ml-12 -mt-10 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        <div className=" w-auto flex-col gap-6 ">
                            <div className=' bg-gray-300/40' id='suaDivId2'>
                                <div className='h-full flex justify-center items-center justify-between px-7 pt-5'>
                                    <h1 className='p-3 text-xl font-semibold leading-7 text-green-600'>Gráfico de dispersão:</h1>
                                    <button onClick={handleScreenshot2} className="text-3xl text-green-600">
                                                        <FaCloudDownloadAlt />
                                                    </button>
                                </div>

                                <CSVLoader />
                            </div>


                            <p className="mt-6 text-xl leading-8 text-gray-700">

                                Um gráfico de dispersão é um tipo de representação gráfica que exibe a relação entre duas variáveis quantitativas. Cada ponto no gráfico representa uma observação e é posicionado com base nos valores das duas variáveis. Ele é particularmente útil para identificar padrões, tendências e relações entre as variáveis.
                            </p>

                        </div>

                    </div>
                </div>



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



            </div>
            <Footer />
        </div>
    );
};

export default ConsultaDataset;