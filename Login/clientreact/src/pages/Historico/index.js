import React, { useState, useEffect } from "react";
import api from "../../services/api";
import GerarPDF from "../../Components/PDF/pdf";
import Header from '../../Components/Header/header';
import { FaRegFilePdf } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';


import riceImg from '../../assets/culturas_img/arroz.jpg';
import maizeImg from '../../assets/culturas_img/milho.jpg';
import chickpeaImg from '../../assets/culturas_img/graodebico.jpg';
import kidneyBeansImg from '../../assets/culturas_img/feijao.jpg';
import pigeonPeasImg from '../../assets/culturas_img/ervilha.jpg';
import mothBeansImg from '../../assets/culturas_img/feijao2.jpg';
import mungBeanImg from '../../assets/culturas_img/feijao3.jpg';
import blackGramImg from '../../assets/culturas_img/feijao4.webp';
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


export default function Historico() {

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

  const [predicao, setPredicao] = useState([]);
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const handleExcluirPredicao = async (id) => {
    try {
      const apiUrl = 'https://localhost:7181';
      const response = await fetch(apiUrl + `/api/MachineLearning/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Origin': 'http://localhost:3000'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete. Status: ${response.status}`);
      }

      const updatedPredicoes = predicao.filter(pred => pred.id !== id);
      setPredicao(updatedPredicoes);
    } catch (error) {
      console.error("Erro na solicitação:", error);
    }
  };

  useEffect(() => {
    api.get('api/MachineLearning', authorization).then(response => {
      setPredicao(response.data);
    }).catch(error => {
      console.error("Erro ao buscar dados:", error);
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="aluno-container">
        <header>
          <span>Bem-vindo, <strong>{email}</strong>!</span>
        </header>

        <form>
          <input type="text" placeholder="Id" />
          <button>
            Filtrar Predição por ID
          </button>
        </form>
        <h1>Histórico de Predições</h1>


        <ul>
          {predicao.map((pred) => (
            <li key={pred.id}>
              <div className=" border border-gray-200 rounded-lg shadow">
                <a href="#">
                  <img className="rounded-t w-full h-64 object-cover" src={cultureImages[pred.predictedLabel]} alt={pred.predictedLabel} />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Id: {pred.id}</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700">
                    <b>Autor: </b>
                    {pred.autor}
                    <br />
                    <b>Nome: </b>
                    {pred.nome}
                    <br />
                    <b>Nitrato: </b>
                    {pred.n}
                    <br />
                    <b>Fósforo: {pred.p}</b>
                    <br />
                    <b>Potásio: {pred.k}</b>
                    <br />
                    <b>PH {pred.ph}</b>
                    <br />
                    <b>Chuva: {pred.rainfall}</b>
                    <br />
                    <b>Umidade: {pred.humidity}</b>
                    <br />
                    <b>Resultado: </b>
                    {pred.predictedLabel}
                  </p>
                  <a onClick={() => GerarPDF(pred)} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 mr-4">
                    Download PDF
                    <FaRegFilePdf className="w-3.5 h-3.5 ml-2" />
                  </a>
                  <a onClick={() => handleExcluirPredicao(pred.id)} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800">
                    Excluir
                    <AiOutlineDelete className="w-3.5 h-3.5 ml-2" />
                    
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
