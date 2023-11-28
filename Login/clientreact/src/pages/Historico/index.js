import React, { useState, useEffect } from "react";
import api from "../../services/api";
import GerarPDF from "../../Components/PDF/pdf";
import Header from '../../Components/Header/header';
import { FaRegFilePdf } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import Unifil from '../../assets/unifil.png';
import "./style.css";
import PredictionCard from "../../Components/Card/PredictionCard";
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import InicioIMG from '../../assets/plantacao-arte-digital.jpg';
import { Link, useNavigate } from 'react-router-dom'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function Historico() {

  const navigate = useNavigate();

  const TelaPredicao = () => {
    navigate('/tela-predicao');
  };


  const [loading, setLoading] = useState(true);

  const [predicao, setPredicao] = useState([]);
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');


  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const handleExcluirPredicao = (id) => {
    setIdToDelete(id);
    setOpen(true);
  };

  const handleConfirmExcluirPredicao = async (id) => {
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
    } finally {
      setLoading(false);
      setOpen(false);
      alert('Análise excluída com sucesso!')
    }

  };

  useEffect(() => {
    setLoading(true); // Marcar como carregando antes da requisição

    if (!token) {
      // Caso o token não esteja presente, exiba uma mensagem
      alert("Token não encontrado. O usuário não está autenticado.");
      setLoading(false); // Marcar como não mais carregando
      return;
    }

    api.get('api/MachineLearning', authorization)
      .then(response => {
        setPredicao(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar dados:", error);
      })
      .finally(() => {
        setLoading(false); // Marcar como não mais carregando, independentemente do resultado
      });
  }, [token]);

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
        <div>
          <Header />
          <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 mt-12">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="lg:max-w-lg">
                  <p className="text-base font-semibold leading-7 text-green-600">Histórico</p>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Análises realizadas: </h1>
                </div>
              </div>
              <p className="mt-6 text-xl leading-8 text-gray-700 lg:col-span-2">
                Na seção atual, encontram-se as classificações já realizadas. Aqui, você tem a opção de baixar o relatório novamente ou excluí-las. No entanto, tome cuidado! Após a exclusão, não será possível recuperá-las.
              </p>
              <p className="mt-6 text-sm leading-8 text-gray-700 lg:col-span-2 pb-10">
                Clique <a onClick={TelaPredicao} className="cursor-pointer text-sm font-semibold leading-6 text-gray-900 hover:text-green-700 transition-all">aqui</a> para ser encaminhado para a tela de classificação.
              </p>
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

            <div>

              <div className="mx-auto flex justify-center items-center">


                <div>
                  <div className="grid grid-cols-3 gap-20">
                    {predicao.map((pred) => (
                      <PredictionCard
                        key={pred.id}
                        pred={pred}
                        onDownloadPDF={GerarPDF}
                        onDelete={() => handleExcluirPredicao(pred.id)}
                        
                      />
                    ))}
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      )}
      <Dialog open={open} handler={() => setOpen(!open)}>
        <DialogHeader>Exclusão de análise.</DialogHeader>
        <DialogBody>
          Tem certeza que deseja excluir a análise {idToDelete}?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpen(false)}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => handleConfirmExcluirPredicao(idToDelete)}>
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

