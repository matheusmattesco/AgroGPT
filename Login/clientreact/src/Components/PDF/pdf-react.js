import React from 'react';
import riceImg from '../../assets/culturas_img/arroz.jpg';
import maizeImg from '../../assets/culturas_img/milho.jpg';
import chickpeaImg from '../../assets/culturas_img/graodebico.jpg';
import kidneyBeansImg from '../../assets/culturas_img/feijao.jpg';
import pigeonPeasImg from '../../assets/culturas_img/ervilha.jpg';
import mothBeansImg from '../../assets/culturas_img/feijao2.jpg';
import mungBeanImg from '../../assets/culturas_img/feijao3.jpg';
import blackGramImg from '../../assets/culturas_img/feijao4.jpg';
import lentilImg from '../../assets/culturas_img/lentilha.jpg';
import pomegranateImg from '../../assets/culturas_img/roma.jpg';
import bananaImg from '../../assets/culturas_img/banana.jpg';
import mangoImg from '../../assets/culturas_img/manga.jpg';
import grapesImg from '../../assets/culturas_img/uva.jpg';
import watermelonImg from '../../assets/culturas_img/melancia.jpg';
import muskmelonImg from '../../assets/culturas_img/melao.jpg';
import appleImg from '../../assets/culturas_img/maca.jpg';
import orangeImg from '../../assets/culturas_img/laranja.jpg';
import papayaImg from '../../assets/culturas_img/papaya.jpg';
import coconutImg from '../../assets/culturas_img/coco.jpg';
import cottonImg from '../../assets/culturas_img/algodao.jpg';
import juteImg from '../../assets/culturas_img/juta.jpg';
import coffeeImg from '../../assets/culturas_img/cafe.jpg';
import Icone from '../../assets/Icone ChatGPT.png'

const ExportContent = ({ pred }) => {
    // Converte a string para um array de números
    const scores = JSON.parse(pred.scoreJson);
    const maxNumber = (Math.max(...scores) * 100).toFixed(2);

    const dataOriginal = new Date(pred.data);
    const dia = String(dataOriginal.getDate()).padStart(2, '0');
    const mes = String(dataOriginal.getMonth() + 1).padStart(2, '0'); // Os meses são baseados em zero, então adicionamos 1
    const ano = dataOriginal.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;

    //<img src={imageSrc} alt={pred.label} />

    const cultureImages = {
        rice: riceImg,
        maize: maizeImg,
        chickpea: chickpeaImg,
        kidneybeans: kidneyBeansImg,
        pigeonpeas: pigeonPeasImg,
        mothbeans: mothBeansImg,
        mungbean: mungBeanImg,
        blackgram: blackGramImg,
        lentil: lentilImg,
        pomegranate: pomegranateImg,
        banana: bananaImg,
        mango: mangoImg,
        grapes: grapesImg,
        watermelon: watermelonImg,
        muskmelon: muskmelonImg,
        apple: appleImg,
        orange: orangeImg,
        papaya: papayaImg,
        coconut: coconutImg,
        cotton: cottonImg,
        jute: juteImg,
        coffee: coffeeImg,
    };

    const imageSrc = cultureImages[pred.predictedLabel];


    return (
        <div>
            <div className='relative p-10'>
                <div className="flex justify-between px-4 sm:px-0">
                    <div>
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Relatório da Análise {pred.id}</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Para mais detalhes consulte a aplicação.</p>
                    </div>
                    <img src={Icone} alt="Logo" className="w-20 h-16" />
                </div>
                <div class="mt-6 border-t border-gray-100 relative">
                    <dl class="divide-y divide-gray-100">
                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt class="text-sm font-medium leading-6 text-gray-900">Nome da Análise:</dt>
                            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{pred.nome}</dd>
                        </div>
                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt class="text-sm font-medium leading-6 text-gray-900">Autor:</dt>
                            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{pred.autor}</dd>
                        </div>
                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt class="text-sm font-medium leading-6 text-gray-900">Data do teste:</dt>
                            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{dataFormatada}</dd>
                        </div>
                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt class="text-sm font-medium leading-6 text-gray-900">Nitrogênio:</dt>
                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{pred.n}</dd>
                        </div>
                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt class="text-sm font-medium leading-6 text-gray-900 ">Fósforo:</dt>
                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{pred.p}</dd>
                        </div>
                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt class="text-sm font-medium leading-6 text-gray-900">Potássio: </dt>
                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{pred.k}</dd>
                        </div>
                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt class="text-sm font-medium leading-6 text-gray-900">Temperatura: </dt>
                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{pred.temperature}</dd>
                        </div>
                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt class="text-sm font-medium leading-6 text-gray-900">Umidade: </dt>
                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{pred.humidity}</dd>
                        </div>
                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt class="text-sm font-medium leading-6 text-gray-900">pH: </dt>
                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{pred.ph}</dd>
                        </div>
                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt class="text-sm font-medium leading-6 text-gray-900">Chuva: </dt>
                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{pred.rainfall}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0" >
                            <dt className="text-sm font-medium leading-6 text-gray-900">Resultado:</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{pred.predictedLabel}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b-gray-100" >
                            <dt className="text-sm font-medium leading-6 text-gray-900">Acurácia:</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{maxNumber}%</dd>
                        </div>
                    </dl>
                </div>
            </div>

        </div>
    );
};

export default ExportContent;
