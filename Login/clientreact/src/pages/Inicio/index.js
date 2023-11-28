import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";
import React from "react";
import InicioIMG from '../../assets/plantacao-arte-digital.jpg';
import { ServerIcon } from '@heroicons/react/20/solid';
import { FaBrain, FaHistory, FaCode  } from "react-icons/fa";



export default function Inicio() {
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
                                        <FaBrain className="mt-1 h-5 w-5 flex-none text-green-600" aria-hidden="true" />
                                        <span>
                                            <strong className="font-semibold text-gray-900">Classificação. </strong>
                                            Nesta seção, os usuários podem inserir seus dados e gerar um relatório da classificação realizada por meio de Inteligência Artificial.
                                        </span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <FaCode className="mt-1 h-5 w-5 flex-none text-green-600" aria-hidden="true" />
                                        <span>
                                            <strong className="font-semibold text-gray-900">Métricas. </strong>
                                            Nesta seção, são apresentados ao usuário uma matriz de confusão e parâmetros adicionais para oferecer uma compreensão mais aprofundada do funcionamento do algoritmo.

                                        </span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <ServerIcon className="mt-1 h-5 w-5 flex-none text-green-600" aria-hidden="true" />
                                        <span>
                                            <strong className="font-semibold text-gray-900">Dataset. </strong>

                                            Nesta seção, apresentamos um gráfico de confusão dinâmico e configurável, juntamente com um relatório detalhado do dataset. O relatório contém informações relevantes sobre cada cultura utilizada no treinamento do algoritmo.


                                        </span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <FaHistory className="mt-1 h-5 w-5 flex-none text-green-600" aria-hidden="true" />
                                        <span>
                                            <strong className="font-semibold text-gray-900">Histórico.</strong>
                                            Nesta seção, você encontra o histórico das classificações realizadas pelos usuários. Aqui, é possível realizar o download do relatório novamente ou excluir uma análise.
                                        </span>
                                    </li>
                                </ul>
                                <p className="mt-8">
                                Na página dedicada a cada funcionalidade, são fornecidas explicações mais detalhadas sobre suas respectivas funções. O objetivo principal deste sistema é proporcionar uma experiência intuitiva e acessível para aqueles que desejam aprender mais sobre inteligência artificial.
                                </p>
                                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Escopo do Projeto.</h2>
                                <p className="mt-6">

                                    Este projeto foi concebido como parte do estágio obrigatório na Universidade Unifil, abordando o tema de inteligência artificial aplicada à agricultura. Desenvolvemos um sistema que emprega conjuntos de dados de solos para realizar classificações com base nessas informações.
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}