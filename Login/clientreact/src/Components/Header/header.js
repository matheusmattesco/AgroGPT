import React from 'react';
//import './style.css';
import logo from "../../assets/Icone ChatGPT.png";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const ConsultaAlgoritmo = () => {
        navigate('/consulta-algoritmo');
    };

    const ConsultaDataset = () => {
        navigate('/consulta-dataset');
    };

    const Inicio = () => {
        navigate('/inicio');
    };

    const Ajuda = () => {
        navigate('/');
    };

    const TelaPredicao = () => {
        navigate('/tela-predicao');
    };

    const Historico = () => {
        navigate('/historico');
    };

    async function logout() {
        try {
            localStorage.clear();
            localStorage.setItem('token', '');
            authorization.headers = undefined; // Defina o cabeçalho como undefined para removê-lo
            navigate('/'); // Use navigate diretamente para mudar para a página inicial
        } catch (error) {
            alert('Não foi possível fazer o logout' + error);
        }
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8 ">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <img className="h-12 w-auto" src={logo} alt="" />
          </a>
        </div>
        <div className="flex gap-10">
        <a onClick={Inicio} className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-700 transition-all" role='button'>
            Inicio
          </a>
          <a onClick={TelaPredicao} className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-700 transition-all" role='button'>
            Classificação
          </a>
          <a onClick={ConsultaAlgoritmo} className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-700 transition-all" role='button'>
            Metricas
          </a>
          <a onClick={ConsultaDataset} className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-700 transition-all" role='button'>
            Dataset
          </a>
          <a onClick={Historico} className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-700 transition-all" role='button'>
            Histórico 
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a onClick={logout} className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-700 transition-all" role='button'>
            Logout <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>

    </header>
    )
};

export default Header;




