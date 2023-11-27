import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/header';
import Footer from '../../Components/Footer/footer';
import GerarPDF from '../../Components/PDF/pdf';
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";


const GerarPredicaoTeste = () => {

    const [Id, setId] = useState(null);
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
    const token = localStorage.getItem('token');
    const [size, setSize] = useState(null);


    const handleOpen = (value) => setSize(value);

    const isFormValid = () => {
        return (
            nome.trim() !== '' &&
            Autor.trim() !== '' &&
            data.trim() !== '' &&
            !isNaN(parseFloat(nValue)) &&
            !isNaN(parseFloat(pValue)) &&
            !isNaN(parseFloat(kValue)) &&
            !isNaN(parseFloat(temperature)) &&
            !isNaN(parseFloat(humidity)) &&
            !isNaN(parseFloat(phValue)) &&
            !isNaN(parseFloat(rainfallValue))
        );
    };

    const handlePredict = async () => {
        const inputData = {
            Autor: Autor,
            Nome: nome,
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

        handleOpen("xs");

        try {
            const apiUrl = 'https://localhost:7181';
            const response = await fetch(apiUrl + '/api/MachineLearning/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:3000',
                    'Authorization': `Bearer ${token}`, // Inclua dentro do objeto headers
                },
                body: JSON.stringify(inputData),
            });

            if (!token) {

                alert("Token não encontrado. O usuário não está autenticado.");
                return;
            }

            if (!response.ok) {
                throw new Error(`Failed to fetch. Status: ${response.status}`);
            }

            if (!isFormValid()) {
                console.error("O formulário não é válido.");
                return;
            }



            const prediction = await response.json();
            const scores = prediction.score;
            const maxNumber = Math.max(...scores) * 100;
            setId(prediction.id);

            const labels = [
                "coco", "milho", "grão de bico", "feijão", "feijão bóer",
                "feijão mensal", "feijão mungo", "blackgram", "lentilha", "romã",
                "banana", "manga", "uvas", "melancia", "melão",
                "maçã", "laranja", "mamão", "arroz", "algodão",
                "juta", "café"
            ];

            const labeledScores = scores.map((value, index) => ({
                nome: labels[index],
                score: value
            }));



            const newPredictedLabel = prediction.predictedLabel;
            setPredictedLabel(newPredictedLabel);
            setResult2(JSON.stringify(labeledScores, null, 2));
            setMaxNumber(maxNumber.toFixed(2));

            GerarPDF({
                id: Id,
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
                                <p className="text-base font-semibold leading-7 text-green-600">Classificação</p>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Insira os dados e veja a mágica acontecer:</h1>
                                <p className="mt-6 text-xl leading-8 text-gray-700">
                                    Ao lado temos um formulário, insira dados do coletados do seu solo para lhe proporcionarmos uma análise completa:
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        <form className="max-w-md mx-auto">
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    id="nValue"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Nome do Teste
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    id="nValue"
                                    value={Autor}
                                    onChange={(e) => setAutor(e.target.value)}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                    placeholder=" "
                                    required />
                                <label
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Autor
                                </label>
                            </div>

                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group " style={{ display: 'none' }}>
                                    <input
                                        type="date"
                                        id="Data"
                                        value={data}
                                        onChange={(e) => setData(e.target.value)}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                        placeholder=" "
                                        required />
                                    <label
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        PH:</label>
                                </div>

                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="number"
                                        id="nValue"
                                        step="0.1"
                                        value={nValue}
                                        onChange={(e) => setNValue(parseFloat(e.target.value))}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                        placeholder=" "
                                        required />
                                    <label
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Nitrogênio:</label>
                                </div>
                            </div>


                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="number"
                                        id="pValue"
                                        step="0.1"
                                        value={pValue}
                                        onChange={(e) => setPValue(parseFloat(e.target.value))}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                        placeholder=" "
                                        required />
                                    <label
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Fósforo</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="number"
                                        id="kValue"
                                        step="0.1"
                                        value={kValue}
                                        onChange={(e) => setKValue(parseFloat(e.target.value))}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                        placeholder=" "
                                        required />
                                    <label
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Potássio:</label>
                                </div>

                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="number"
                                        id="temperature"
                                        step="0.1"
                                        value={temperature}
                                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                        placeholder=" "
                                        required />
                                    <label
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Temperatura:</label>
                                </div>

                                <div class="relative z-0 w-full mb-5 group">
                                    <input
                                        type="number"
                                        id="humidity"
                                        step="0.1"
                                        value={humidity}
                                        onChange={(e) => setHumidity(parseFloat(e.target.value))}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                        placeholder=" "
                                        required />
                                    <label
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Umidade:</label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="number"
                                        id="phValue"
                                        step="0.1"
                                        value={phValue}
                                        onChange={(e) => setPhValue(parseFloat(e.target.value))}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                        placeholder=" "
                                        required />
                                    <label
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        PH:</label>
                                </div>

                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="number"
                                        id="rainfallValue"
                                        step="0.1"
                                        value={rainfallValue}
                                        onChange={(e) => setRainfallValue(parseFloat(e.target.value))}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Quantidade de Chuva:</label>
                                </div>


                                <div className="relative z-0 w-full mb-5 group " style={{ display: 'none' }}>
                                    <input
                                        type="number"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                        placeholder=" "
                                        required
                                    />
                                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Quantidade de Chuva:</label>
                                </div>

                            </div>
                            <Button
                                onClick={handlePredict}
                                disabled={!isFormValid()}
                                type="submit"

                            >
                                Enviar

                            </Button>



                        </form>
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
                    <Dialog
                        open={
                            size === "xs" ||
                            size === "sm" ||
                            size === "md" ||
                            size === "lg" ||
                            size === "xl" ||
                            size === "xxl"
                        }
                        size={size || "md"}
                        handler={handleOpen}
                    >
                        <DialogHeader>Download realizado com sucesso.</DialogHeader>
                        <DialogBody>
                            Por gentileza acesse a aba de downloads e acesse seu relatório em PDF.
                            Id do relatório: {Id}
                            A Melhor cultura para o seu solo é {predictedLabel} e com a porcentagem de sucesso de {maxNumber}%
                            Acesse o <a href="">Histórico</a> para realizar novamente o download da sua análise {Id}

                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="gradient"
                                color="green"
                                onClick={() => handleOpen(null)}
                            >
                                <span>Ok</span>
                            </Button>
                        </DialogFooter>
                    </Dialog>
                </div>
            </div>



            <Footer />
        </div>
    );
};

export default GerarPredicaoTeste;
